function qs(element){
    return document.querySelector(element)
}

window.addEventListener('load', function(){

    let body = qs('body')
    let laPostaReminder = qs('#la-posta-reminder');
    let meetStudentsReminder = qs('#meet-students-reminder');
    let postaLI = qs('.posta');
    let meetLI = qs('.meet');


    var timeoutInMiliseconds = 5000;
    var timeoutId; 

    function resetTimer() { 
        window.clearTimeout(timeoutId)
        startTimer();
    }

    function startTimer() { 
        timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
    }
    
    function doInactive() {
        postaLI.classList.add('gradient-border');
        laPostaReminder.classList.remove('d-none');

        window.addEventListener('click', function(){
            postaLI.classList.remove('gradient-border');
            laPostaReminder.classList.add('d-none');

            meetLI.classList.add('gradient-border');
            meetStudentsReminder.classList.remove('d-none')
        })


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