set('titles', [
  {
    title: 'jobless'
  },
  {
    title: 'attack on titan'
  }
])


chrome.runtime.onMessage.addListener(async function(msg, sender){
  console.log(`EXTENSION`, msg)
  const titles = await get('titles')
  console.log(titles)
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

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openDrawer
  });


  get('key')
});


