window.addEventListener('load', function(){
    
    //#region ACTIVATE NEW INPUTS
    let newUniversityInputs = document.querySelector('#new-university');
    let newInstituteInputs = document.querySelectorAll('#new-institute');
    let addForUniversity = document.querySelector('#university-add-btn');
    let addForInstitute = document.querySelector('#institute-add-btn');
    let instituteIndex = 0;
    let instituteLimits = 3;

    addForUniversity.addEventListener('click', event => {
        newUniversityInputs.classList.remove('d-none');
        addForUniversity.classList.add('d-none');
    });

    addForInstitute.addEventListener('click', event => {
        newInstituteInputs[instituteIndex].classList.remove('d-none');
        instituteIndex++;
        if(instituteIndex >= instituteLimits) addForInstitute.classList.add('d-none');
    });
    //#endregion

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
                careerSelected[0].innerHTML = '<option value="" hidden>Selecciona una Carrera</option>';
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
                careerSelected[1].innerHTML = '<option value="" hidden>Selecciona una Carrera</option>';
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
                courseSelected[0].innerHTML = '<option value="" hidden>Selecciona un Curso</option>';
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
                courseSelected[1].innerHTML = '<option value="" hidden>Selecciona un Curso</option>';
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
                courseSelected[2].innerHTML = '<option value="" hidden>Selecciona un Curso</option>';
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
                courseSelected[3].innerHTML = '<option value="" hidden>Selecciona un Curso</option>';
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
        fetch('/endpoints/user/')
        .then(userResponse => {
            return userResponse.json();
        })
        .then( user => {
            provinces.provincias.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre === b.nombre ? 0 : 1)
            for(let i = 0; i < provinces.provincias.length; i++){
                if(user.province == provinces.provincias[i].nombre){
                    provinceSelect.innerHTML +=`<option value="${provinces.provincias[i].nombre}" selected>  ${provinces.provincias[i].nombre} </option>`
                }else{
                    provinceSelect.innerHTML +=`<option value="${provinces.provincias[i].nombre}">  ${provinces.provincias[i].nombre} </option>`
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

    //#region SEARCH FILTER
    let searchCard = document.querySelector('#searchFilter');
    let interestsInput = document.querySelector('#interests');

    let interests = [];
    fetch('/endpoints/interests')
    .then(response => {
        return response.json();
    })
    .then( interestsRepsonse => {
        interests = interestsRepsonse;
    })

    interestsInput.addEventListener('input', event => {
        
        if(event.target.value == '' || event.target.value == null){
            searchCard.innerHTML = '';         
            return;
        }
        if(interests.length > 0){
            let inputData = event.target.value.toLowerCase();
            for(let i = 0; i < interests.length; i++){
                let interest = interests[i].interest_name.toLowerCase();
                
                if(interest.includes(inputData.toLowerCase())){
                    searchCard.innerHTML =`<option id="inputButton" value="${interests[i].interest_name}">  ${interests[i].interest_name} </option>`
                    
                    
                    let inputButtonComplete = document.querySelector('#inputButton');
                    inputButtonComplete.addEventListener('click', event => {
                        searchCard.innerHTML = '';
                        interestsInput.value = inputButtonComplete.value;
                    });
                }
                
            }
            
        }
        
    });
    

    //#endregion
});