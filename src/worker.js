set('titles', [
  {
    title: 'jobless',
    url: 'www.google.com',
    watchedEpisodes : [1,2,3]
  },
  {
    title: 'attack on titan',
    url: 'www.google.com',
    watchedEpisodes : [1,2,4]
  }
])

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addEaddListener(async function(msg, sender, sendResponse){
  console.log(` >> ${msg}`)
  const method = msg.method
  const path = msg.path
  const attributes = msg.attributes

  switch(path){
    case "/tiles": {
      switch(method) {
        case "get": {
          const titles = await get('titles')
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
    default: {
      console.error(`Path not defined`)
    }
  }


})

async function sendToCurrentPage(message){
  const tab = await getCurrentTab()
  return new Promise(res => {
    chrome.tabs.sendMessage(tab.id, message, function (response) {
      res(response)
    });
  });
}

chrome.action.onClicked.addListener((tab) => {
  set('current_page', tab.url)
  console.log(tab)
  get('key').then(res =>{
    console.log('key?: ' ,res);
  })
});


