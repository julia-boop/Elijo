function qs(element){
    return document.querySelector(element)
}

window.addEventListener('load', function(){

let body = qs('body')


var timeoutInMiliseconds = 6000;
var timeoutId; 

function resetTimer() { 
    window.clearTimeout(timeoutId)
    startTimer();
}
  
function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
  
function doInactive() {
    console.log('inactividad')
    body.classList.add('guide-div')
    body.addEventListener('click', function(){
        body.classList.remove('guide-div')
    })
}
 
function setupTimers () {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}
 
$(document).ready(function(){     
    setupTimers();
})


})    


// let body = qs('body')


    // timeoutID = setInterval(function(){
    //     body.classList.add('guide-div')
    //     console.log('ok')
    // }, 3000)
    // let activityEvents = ['mouseover', 'mouseup', 'mousedown', 'keypress', 'touchmove', 'click']
    // activityEvents.forEach(function(event){
    //     window.addEventListener(event, function(){
    //         clearInterval(timeoutID)
    //     })
    // })

    // body.addEventListener('click', function(){
    //     body.classList.remove('guide-div')
    // })