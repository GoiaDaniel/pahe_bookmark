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

//SIDENAV
const sideNav = document.createElement('div')
sideNav.id = 'mySidenav'
sideNav.className = 'sidenav'

//SIDENAV MENU
const sideNavMenu = document.createElement('span')
sideNavMenu.innerText = 'TEST'
sideNavMenu.onclick = sendMessage
sideNav.appendChild(sideNavMenu)

const closeSideNav = document.createElement('span')
closeSideNav.innerText = 'CLOSE'
closeSideNav.className = 'closebtn'
closeSideNav.onclick = closeNav
sideNav.appendChild(closeSideNav)

//OPEN SIDENAV BUTTON
const openSideNavButton = document.createElement('span')
openSideNavButton.innerText = 'OPEN SIDENAV'
openSideNavButton.className = 'side-nav-open-btn'
openSideNavButton.onclick = openNav

document.body.append(sideNav)
document.body.append(openSideNavButton)

console.log(document.body)


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

  console.log(request)
  sendResponse(`OK`)

});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "60em";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



function sendMessage(){
  chrome.runtime.sendMessage("TEST", function(response) {
    console.log(response);
  });
}

sendMessage();