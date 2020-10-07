window.addEventListener('load', function(){
    
    //#region STUDIES SELECTION
    let universitySelected = document.querySelectorAll('#universitySelector');
    let careerSelected = document.querySelectorAll('#career');

    let instituteSelected = document.querySelectorAll('#instituteSelector');
    let courseSelected = document.querySelectorAll('#course');
    
    universitySelected[0].addEventListener('change', event => {
        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/careers/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(careers => {
                for(let i = 0; i < careers.length; i++){
                    careerSelected[0].innerHTML +=`<option value="${careers[i].id}">  ${careers[i].name} </option>`
                }
            })
        }
    });
    universitySelected[1].addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/careers/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(careers => {
                for(let i = 0; i < careers.length; i++){
                    //careerSelected.innerHTML += '<option value="">' + careers[i] + '</option>'
                    careerSelected[1].innerHTML +=`<option value="${careers[i].id}">  ${careers[i].name} </option>`
                    
                }
            })
        }
        
    });

    instituteSelected[0].addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/courses/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(courses => {
                for(let i = 0; i < courses.length; i++){
                    courseSelected[0].innerHTML +=`<option value="${courses[i].id}">  ${courses[i].name} </option>`
                }
            })
        }
        
    });
    instituteSelected[1].addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/courses/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(courses => {
                for(let i = 0; i < courses.length; i++){
                    courseSelected[1].innerHTML +=`<option value="${courses[i].id}">  ${courses[i].name} </option>`
                }
            })
        }
        
    });
    instituteSelected[2].addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/courses/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(courses => {
                for(let i = 0; i < courses.length; i++){
                    courseSelected[2].innerHTML +=`<option value="${courses[i].id}">  ${courses[i].name} </option>`
                }
            })
        }
        
    });
    instituteSelected[3].addEventListener('change', event => {

        if(event.target.value != 'others' || event.target.value != null){
            fetch('/endpoints/courses/'+event.target.value)
            .then(response => {
                return response.json();
            })
            .then(courses => {
                for(let i = 0; i < courses.length; i++){
                    courseSelected[3].innerHTML +=`<option value="${courses[i].id}">  ${courses[i].name} </option>`
                }
            })
        }
        
    });
    //#endregion

    //#region PROVINCE
    let provinceSelect = document.querySelector('#province');
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(response => {
        return response.json()
    })
    .then(provinces => {
        fetch('/endpoints/user/'+1)//aca iria el id del user
        .then(userResponse => {
            return userResponse.json();
        })
        .then( user => {
            for(let i = 0; i < provinces.provincias.length; i++){
                if(user.province == provinces.provincias[i].id){
                    provinceSelect.innerHTML +=`<option value="${provinces.provincias[i].id}" selected>  ${provinces.provincias[i].nombre} </option>`
                }else{
                    provinceSelect.innerHTML +=`<option value="${provinces.provincias[i].id}">  ${provinces.provincias[i].nombre} </option>`
                }
                
            }
            
        })
        
    })
    //#endregion

    //#region PHOTO
    let botonSeleccionarImg = qs('#visualBtn');
    let inputSeleccionarArchivo = qs('.inputSeleccionarArchivo');

    botonSeleccionarImg.addEventListener('click', function() {
        inputSeleccionarArchivo.click()
    })
    //#endregion
});