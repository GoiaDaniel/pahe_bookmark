
/*function reddenPage() {
    document.body.style.backgroundColor = 'red';
    console.log('DOCUMENT:',document);
}*/
/*

function addElement (){

    }
*/

    /*const newDiv = document.createElement('side-drawer');
    newDiv.className='open';
    const newContent = document.createTextNode('TTTEEEESSST');
    newDiv.appendChild(newContent);
    const mainElements = document.getElementsByClassName('main')
    const currentMainDiv = mainElements[0];
    currentMainDiv.className='main flex-container'
    console.log('currentDiv',currentMainDiv);
    currentMainDiv.appendChild(newDiv);

    const currentArticle = document.getElementsByTagName('article')[0];
    console.log('Current article', currentArticle);
    const contentWrapper = document.getElementsByClassName('content-wrapper')[0];
    const contentTheatre = document.getElementsByClassName('theatre')[0];
    console.log('Content wrapper: ' ,contentWrapper);
    console.log('DOCUMENT:',document);*/
}

/*chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addElement
    });
});*/

//document.body.onload = addElement;


/*
chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id,"toggle");
});*/


chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.sendMessage(tab.id,"toggle");
});