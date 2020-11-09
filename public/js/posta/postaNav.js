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

function fetchInstitution(id, institutionType){
    let toFind;
    (institutionType == "university") ?  toFind = "careers" : toFind = "courses";
    fetch(`/endpoints/${toFind}/${id}`).then(response => {
        return response.json();
    })
    .then(result => {
        let career = result;

        addToContainer(career);

        fetch(`/endpoints/${institutionType}/${id}`).then(response => {
            return response.json();
        })
        .then(result => {
            let data = result;

            changeUsefulInformation(data, career[0]);

            fetch(`/endpoints/${institutionType}/${id}/opinions`)
            .then( response => {
                return response.json();
            }) 
            .then(opinions => {
                showStudentsOpinions(opinions); 
            })
        })  
    });    
}
//#endregion

//#region CAREERS CONTAINER
function addToContainer(careers){
    let container = document.querySelector('.carreers-container');
    if(careers.length > 0){
        container.innerHTML+= ` <div class="carreers-h4-container">
                                    <h4>Carreras Disponibles</h4>
                                </div>
                                <div class="carreers-btn" id="careersContainer">         
                                </div>`;
    }

    let careersContainer = document.querySelector('#careersContainer');
    careersContainer.innerHTML = '';

    

    for(let i = 0; i < careers.length; i++ ){
        careersContainer.innerHTML += `<button>${careers[i].name}</button>`
    }
    
}
//#endregion

//#region CHANGE RIGHT INFO
function changeUsefulInformation(data, career){
    let webPageLink = document.querySelector('#web-page-link');
    let studyPlanLink = document.querySelector('#study-plan-link');
    let mapLink = document.querySelector('#map-link');
    let adressData = document.querySelector('#adress-data');
    
    webPageLink.href = data.link;
    studyPlanLink.href = career.plan_link;
}
//#endregion

//#region STUDENTS OPINIONS
function showStudentsOpinions(opinions){
    //console.log(opinions);
    let opinionsContainer = document.querySelector('#opinionsContainer')

    //console.log(photo);

    
    for(let i = 0; i < opinions.length; i++){
        opinionsContainer.innerHTML += `
            <article>
                <h6><img src="/images/users/${opinions[i].User.photo}" alt="">${opinions[i].User.name}</h6>
                <p>${opinions[i].opinion}</p>
            </article>
        `;
    }
}
//#endregion

window.addEventListener('load', () => {
    //#region INIT
    loadInstitutions();
    //#endregion

    //#region QUERY SELECTORS
    let universityInput = document.querySelector('.universityInput');
    let instituteInput = document.querySelector('.instituteInput');
    let universityResults = document.querySelector('.universityResults');
    let instituteResults = document.querySelector('.instituteResults');
    //#endregion
    
    //#region NAV INPUTS
    universityInput.addEventListener('change', event => {
        let amountOfResults = 0;
        universityResults.innerHTML = ''; 
        if(event.target.value == '' || event.target.value == null){
            universityResults.innerHTML = '';         
            return;
        }
        if(universities.length > 0){
            let inputData = event.target.value.toLowerCase();
            for(let i = 0; i < universities.length; i++){
                
                let univ = universities[i].name.toLowerCase();
                
                if(univ.includes(inputData.toLowerCase())){
                    amountOfResults++;
                    universityResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${universities[i].id}" onclick="fetchInstitution(${universities[i].id}, 'university')">  <button>${universities[i].name}</button> </option>`;
                }
            }
            if(amountOfResults <= 0) universityResults.innerHTML = 'No se encontraron resultados';
        }
    });

    instituteInput.addEventListener('change', event => {
        let amountOfResults = 0;
        instituteResults.innerHTML = '';
        if(event.target.value == '' || event.target.value == null){
            instituteResults.innerHTML = '';         
            return;
        }
        if(institutes.length > 0){
            let inputData = event.target.value.toLowerCase();
            for(let i = 0; i < institutes.length; i++){
                
                let inst = institutes[i].name.toLowerCase();
                
                if(inst.includes(inputData.toLowerCase())){
                    amountOfResults++;
                    instituteResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${institutes[i].id}" onclick="fetchInstitution(${institutes[i].id}, 'institute')">  <button>${institutes[i].name}</button> </option>`;
                }
            }

            if(amountOfResults <= 0) instituteResults.innerHTML = 'No se encontraron resultados';
        }
    });
    //#endregion
});