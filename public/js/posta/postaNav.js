let universities;
let institutes;

//#region  FETCHS
function loadInstitutions(){
    fetch('/endpoints/university').then(response => {
        return response.json();
    })
    .then( universitiesRepsonse => {
        universities =  universitiesRepsonse;
    });

    fetch('/endpoints/institute').then(response => {
        return response.json();
    })
    .then( institutesRepsonse => {
        institutes =  institutesRepsonse;
    });
}
//#endregion

window.addEventListener('load', () => {
    loadInstitutions();
    let universityInput = document.querySelector('.universityInput');
    let instituteInput = document.querySelector('.instituteInput');
    let universityResults = document.querySelector('.universityResults');
    let instituteResults = document.querySelector('.instituteResults');

    universityInput.addEventListener('change', e => {
        
        if(e.target.value == '' || e.target.value == null){
            console.log('vacio');
            universityResults.innerHTML = '';         
            return;
        }else{
            universityResults.innerHTML = 'cargando...';         
        }
        if(universities.length > 0){
            let inputData = e.target.value.toLowerCase();
            universityResults.innerHTML = '';
            for(let i = 0; i < universities.length; i++){
                
                let univ = universities[i].name.toLowerCase();
                
                if(univ.includes(inputData.toLowerCase())){
                    universityResults.innerHTML +=`<option id="inputButton" value="${universities[i].id}">  <a href="#">${universities[i].name}</a> </option>`;
                }
                
            }
            
        }
    });
    instituteInput.addEventListener('change', e => {
        if(e.target.value == '' || e.target.value == null){
            instituteResults.innerHTML = '';         
            return;
        }
    });
});