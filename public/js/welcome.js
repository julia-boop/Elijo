window.addEventListener('load', function(){
    let popUp = document.querySelector('.pop-up-background');
    let popUpCross = document.querySelector('.quit-btn');
    let popUpSend = document.querySelector('.pop-up-send-btn');

    /*window.scroll(false);*/
    popUp.classList.remove('close');
    popUp.classList.add('open');

    popUpCross.addEventListener('click', function(){
        popUp.classList.remove('open');
        popUp.classList.add('close');
    });

    popUpSend.addEventListener('click', function(){
        popUp.classList.remove('open');
        popUp.classList.add('close');
        //ENVIA INFO
    });
})