chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
    }
})

const div = document.createElement('div');
div.style.background = "green";
div.style.height = "100%";
div.style.width = "100px";
/*div.style.position = "fixed";
div.style.top = "0px";
div.style.right = "0px";
div.style.zIndex = "9000000000000000000";
div.frameBorder = "none";*/
div.innerText='TEST';
div.id='new';

// const mainClass = document.getElementsByClassName('main')[0];
document.body.appendChild(div);
console.log('Body', document.body);

function toggle(){
    if(div.style.width == "0px"){
        div.style.width="400px";
    }
    else{
        div.style.width="0px";
    }
}