window.addEventListener('load', function(){
    let universitySelected = document.querySelector('#universitySelector');
    let careerSelected = document.querySelector('#career');

    let instituteSelected = document.querySelector('#instituteSelector');
    let courseSelected = document.querySelectorAll('#course');

    let provinceSelect = document.querySelector('#province');
    

    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(response => {
        return response.json()
    })
    .then(provinces => {
        for(let i = 0; i < provinces.provincias.length; i++){
            provinceSelect.innerHTML +=`<option value="${provinces.provincias[i].id}">  ${provinces.provincias[i].nombre} </option>`
        }
    })


    universitySelected.addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/careers/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(careers => {
                for(let i = 0; i < careers.length; i++){
                    //careerSelected.innerHTML += '<option value="">' + careers[i] + '</option>'
                    careerSelected.innerHTML +=`<option value="${careers[i].id}">  ${careers[i].name} </option>`
                    
                }
            })
        }
        
    });

    instituteSelected.addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/courses/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(courses => {
                for(let i = 0; i < courses.length; i++){
                    for(let j = 0; j < courseSelected.length; j++){
                        courseSelected[j].innerHTML +=`<option value="${courses[i].id}">  ${courses[i].name} </option>`
                    }
                }
            })
        }
        
    });
    

    /*FOTO*/
    let botonSeleccionarImg = qs('#visualBtn');
    let inputSeleccionarArchivo = qs('.inputSeleccionarArchivo');

    botonSeleccionarImg.addEventListener('click', function() {
        inputSeleccionarArchivo.click()
    })
    
});