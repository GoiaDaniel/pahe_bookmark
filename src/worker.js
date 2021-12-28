set('titles', [])
let titles = [];

async function getCurrentTab() {
  return new Promise(res => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, ([currentTab]) => {
      res(currentTab);
    });
  })
}

chrome.runtime.onMessage.addListener(async function(msg, sender, sendResponse){
  console.log(` >> `,msg)
  const method = msg.method
  const path = msg.path
  const attributes = msg.attributes

  switch(path){
    case "/titles": {
      switch(method) {
        case "get": {
          sendResponse(titles)
          break;
        }
        case "post": {
          const currentTitles = await get('titles')
          const updatedTitleList = currentTitles.concat(attributes)
          await set('titles', updatedTitleList)
          break;
        }
      }

      break;
    }
    case "/bookmark": {
      switch (method) {
        case "post": {
          const currentTab = await getCurrentTab();
          await saveTitle(currentTab)
          sendResponse('ok')
          break;
        }
      }
      break;
    }
    default: {
      console.error(`Path not defined`)
    }
  }
})

async function saveTitle(currentTab) {
  const newTitle = {
    title: currentTab.title.split(' Ep.')[0],
    url: currentTab.url,
    watchedEpisodes: []
  }
  const currentTitles = await get('titles')
  if(!currentTitles.titles.find(title => title.title === newTitle.title)) {
    const newTitles = currentTitles.titles.concat([newTitle])
    set('titles', newTitles)
    titles = newTitles
    console.log(`Added ${newTitle.title}`)
  }
}

async function sendToCurrentPage(message){
  const tab = await getCurrentTab()
  return new Promise(res => {
    chrome.tabs.sendMessage(tab.id, message, function (response) {
      res(response)
    });
  });
}

/*
chrome.action.onClicked.addListener((tab) => {
  set('current_page', tab.url)
  console.log(tab)
  get('key').then(res =>{
    console.log('key?: ' ,res);
  })
});
*/


