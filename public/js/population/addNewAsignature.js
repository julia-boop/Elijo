window.addEventListener('load', function(){
    console.log("entre");
    let asignatureName = document.querySelector("#asignatureName");

    let newAsignatureBtn = document.querySelector("#addNewAsignature");
    let asignaturesContainer = document.querySelector("#asignatures");
    let asignature = document.querySelector("#asignature");
    let submitBtn = document.querySelector("#BtnSubmitCareer");
    let newCareerInput = document.querySelector("#newCareer");
    let form = document.querySelector("form");

    newAsignatureBtn.addEventListener('click', (event) => {
        asignaturesContainer.innerHTML += asignature.outerHTML;
    });
    
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let promptInfo = prompt("¿Queres cargar otra carrera?");
        
        if(promptInfo != null){
            newCareerInput.value += 'checked'
            form.submit();
        }else{
            form.submit();
        }
        
    });

})