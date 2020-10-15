window.addEventListener('load', function(){
    console.log("entre");
    let asignatureName = document.querySelector("#asignatureName");
    
    let asignaturesContainer = document.querySelector("#asignatures");
    let asignature = document.querySelector("#asignature");
    let submitBtn = document.querySelector("#BtnSubmitCareer");
    let newCareerInput = document.querySelector("#newCareer");
    let form = document.querySelector("form");
    let amountAsignatures = document.querySelector('#amountAsignatures')
    
    
    amountAsignatures.addEventListener('change', (event) => {
        asignaturesContainer.innerHTML = '';
        for(let i = 0; i < amountAsignatures.value; i++) {
            asignaturesContainer.innerHTML += `
            <div id="asignature">
                <div id="asignatureName">
                    <h4 class="mt-3">Nombre de la asignatura:</h4>
                    <input required class="" name="asignature_name" type="text" placeholder="programación">
                </div>    
                <div>
                    <h4 class="mt-3">Año de cursada de asignatura:</h4>
                    <input required class="" name="asignature_year" type="text" placeholder="3">
                </div>
            </div>`;
        }
    })
    
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let promptInfo = prompt("¿Queres cargar otra carrera? SI - NO - CANCELAR = no hace nada");
        
        if(promptInfo == 'si'){
            newCareerInput.value = 'si'
            form.submit();
        }else if(promptInfo == 'no'){
            console.log('no')
            form.submit();
        }
        
        
    });
    
})