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

chrome.runtime.onMessage.addListener(async function(msg, sender){
  console.log(`EXTENSION`, msg)
  const titles = await get('titles')
  console.log(titles)
  const tab = getCurrentTab();
  console.log('Url: ',tab);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(`Sending message to content script`)
    chrome.tabs.sendMessage(tabs[0].id, titles, function(response) {
      console.log(`EXTENSION 2`, response);
    });
  });

})

chrome.action.onClicked.addListener((tab) => {
  set('current_page', tab.url)
  console.log(tab)

/*  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openDrawer
  });*/


  get('key').then(res =>{
    console.log('key?: ' ,res);
  })
});


