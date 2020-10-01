window.addEventListener('load', function(){
    console.log("entre");
    let asignatureName = document.querySelector("#asignatureName");

    let newAsignatureBtn = document.querySelector("#addNewAsignature");
    let asignaturesContainer = document.querySelector("#asignatures");
    let asignature = document.querySelector("#asignature");
    
    newAsignatureBtn.addEventListener('click', (evento) => {
        asignaturesContainer.innerHTML += asignature.outerHTML;
    });
})