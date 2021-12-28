

//Create the Side nav element
function createSideNav(storageResponseExample){
  const sideNav = document.createElement('div')
  sideNav.id = 'mySidenav'
  sideNav.className = 'sidenav'
  createSideNavMenu(sideNav,storageResponseExample);
  closeButton(sideNav);
  document.body.append(sideNav);
}
//Create close button for the sidenav
function closeButton(sideNav){
  const closeSideNav = document.createElement('span')
  closeSideNav.innerText = 'CLOSE'
  closeSideNav.className = 'closebtn'
  closeSideNav.onclick = closeNav
  sideNav.appendChild(closeSideNav)
}
//Create open button for the sidenav
function openButton(){
  const openSideNavButton = document.createElement('span')
  openSideNavButton.id='openSideNavButton'
  openSideNavButton.innerText = 'OPEN SIDENAV'
  openSideNavButton.className = 'side-nav-open-btn'
  openSideNavButton.onclick = openNav
  document.body.append(openSideNavButton)
}


/*
<div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>

<!-- Use any element to open the sidenav -->
<span onclick="openNav()">open</span>

<!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
<div id="main">
  ...
</div>
 */

const storageResponseExample = [
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
];
function createWatchedEpisodesList(element,episodes){
  let row = document.createElement('div');
  row.className='content'
  episodes.forEach( episode =>{
    let pElement = document.createElement('a');
    pElement.innerText = episode
    pElement.style.display='inline'
    pElement.href = 'www.google.com'
    row.appendChild(pElement);
  })
  element.appendChild(row)
}



function  createSideNavMenu(sideNav,storageResponseExample){
  const sideNavMenu = document.createElement('a')
  sideNavMenu.innerText = 'Bookmarks'
  sideNav.appendChild(sideNavMenu)

  storageResponseExample.forEach( title =>{
    let element = document.createElement('div');
    element.className='titleRow';
    let button = document.createElement('button');
    button.className='collapsible';
    button.innerText=title.title;
    button.addEventListener('click', function(){
      button.classList.toggle('active');
      let content = button.nextSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
      console.log('content',content, button,element);
    });
    element.appendChild(button)
    createWatchedEpisodesList(element,title.watchedEpisodes);


    sideNav.appendChild(element)

  });



}
function addButtonToggle(){
  let coll = document.getElementsByClassName("collapsible");
  console.log('coll', coll);
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      console.log('content',content);
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}
createSideNav(storageResponseExample);

openButton()

function loadTitles(){
  return request({ method: 'get', path: '/tiles'})
}

function saveTitle(title){
  return request({ method: 'post', path: '/tiles', attributes: [title]})
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "30em";
  document.getElementById('openSideNavButton').style.opacity = '0';
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('openSideNavButton').style.opacity = '1';
}

/* Load data from the extension */
function request(message){
  return new Promise(res => {
    chrome.runtime.sendMessage(message, function(response) {
      res(response)
    });
  })
}

/* Receive message from the extension */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request)
  sendResponse(`OK`)
});