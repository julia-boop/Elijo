function removeInterest(id){
    let interestsContainer = document.querySelector('#interestsContainer');
    interestsContainer.removeChild(interestsContainer.childNodes[id]);
    interestsContainer.removeChild(interestsContainer.childNodes[id+1]);
    //console.log(interestsContainer.childNodes[id]);
}

window.addEventListener('load', function(){
    let interestsInput = document.querySelector('#interests');
    let form = document.querySelector('#userForm');
    let submitBtn = document.querySelector('#submitBtn');
    let interestsContainer = document.querySelector('#interestsContainer');
    let addInterestButton = document.querySelector('#interestButton');
    
    let interestsCounter = 0;
    //CUANDO SE TOCA EL BOTON DE AGREGAR
    addInterestButton.addEventListener('click', event => {
        //AGREGO AL CONTAINER DE BOTONES UN BOTON CON UN ID TEMPROAL
        //'<i class="far fa-times-circle pl-2"></i>'   + 
        interestsContainer.innerHTML += '<button id="tempID">' + interestsInput.value + '</button>';
        //interestsContainer.innerHTML += '<input id="tempID">';
        //GETTEO EL ID TEMPROAL PARA MODIFICARLE LAS COSA SCON LA INFO QUE QUIERO
        let tempIdBtn = document.querySelector('#tempID');
        //tempIdBtn.id = interestsInput.value;
        interestsCounter++;
        tempIdBtn.id = interestsCounter;
        tempIdBtn.name = 'interests';
        tempIdBtn.value = interestsInput.value;
        tempIdBtn.classList.add('interest-btn');
    });

    document.addEventListener('click', event => {
        if(event.target.localName == 'button'){
            for(let i = 0; i < interestsContainer.childNodes.length; i++){
                if(interestsContainer.childNodes[i].id == event.target.id){
                    removeInterest(i);
                }
            }   
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
    });
    submitBtn.addEventListener('click', event => {
        if(interestsContainer.childNodes.length > 1){
            for(let i = 0; i < interestsContainer.childNodes.length; i++){
                if(interestsContainer.childNodes[i].localName == 'button'){
                    interestsContainer.innerHTML += '<input id="tempID">';
                    let tempIdBtn = document.querySelector('#tempID');
                    tempIdBtn.id = i;
                    tempIdBtn.name = 'interests';
                    tempIdBtn.value = interestsContainer.childNodes[i].value;
                    tempIdBtn.style.visibility = 'hidden';
                }
            }
        }
        
        form.submit();
    });
});