let universities;
let institutes;
let opinionsOnGeneral = [];
let actualGeneralPage = 0;
const amountByPage = 5;

let answerArray = [];
let actualAnswerPage = 0;

let tipsArray = [];
let actualTipsPage = 0;

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
        return response.json(); //guido que mierda es esto
    })
    .then(result => {
        let career = result;
        
        addToContainer(career, institutionType);
        
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

function fetchStudiesManager(id, institutionType) {
    fetchCareerData(id, institutionType);
    fetchAnswersCareerOrCourse(id, institutionType);
    fetchTipsCareerOrCourse(id, institutionType);
}

function fetchInstitutionManager(id, institutionType) {
    fetchInstitution(id, institutionType);
    fetchAnswersInstitutesAndUniversities(id, institutionType);
    fetchTipsInstitutesAndUniversities(id, institutionType);
}

function fetchCareerData(careerID, institutionType){
    
    fetch(`/endpoints/${institutionType}/study/${careerID}/opinions`).then(response => {
        return response.json();
    })
    .then(result => {
        
        showStudentsOpinions(result);
        
        let study;
        (institutionType == 'university') ? study = 'career' : study = 'course';
        
        fetch(`/endpoints/${study}/${careerID}`).then(response => {
            return response.json();
        }) 
        .then(result => {
            let linksContainer = document.querySelector('#links-container');
            
            linksContainer.innerHTML += `<li><a id="study-plan-link" href="">Plan de estudios</a></li>` ;
            
            let studyPlanLink = document.querySelector('#study-plan-link');
            
            studyPlanLink.href = `${result.plan_link}`;
        })
    })
}

function fetchAnswersInstitutesAndUniversities(id, instituteOrUniversity) {
    fetch(`/endpoints/${instituteOrUniversity}/${id}/answers`)
    .then(response => {
        return response.json();
    })
    .then(result => {
        addToFaqsContainer(result);
        makePaginationAnswer(result);
        changeAnswerPage(0);
    })
}

function fetchAnswersCareerOrCourse(id, careerOrCourse) {
    let toFind;
    (careerOrCourse == "university") ?  toFind = "careers" : toFind = "courses";
    fetch(`/endpoints/${toFind}/${id}/answers`).then(response => {
        return response.json();
    })
    .then(result => {
        addToFaqsContainer(result);
        makePaginationAnswer(result);
        changeAnswerPage(0);
    })
}

function fetchTipsInstitutesAndUniversities(id, instituteOrUniversity) {
    fetch(`/endpoints/${instituteOrUniversity}/${id}/tips`)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(result => {
        console.log(result);
        addToTipsContainer(result);
        makePaginationTips(result);
        changeTipsPage(0);
    })
}

function fetchTipsCareerOrCourse(id, careerOrCourse) {
    let toFind;
    (careerOrCourse == "university") ?  toFind = "careers" : toFind = "courses";
    fetch(`/endpoints/${toFind}/${id}/tips`).then(response => {
        return response.json();
    })
    .then(result => {
        addToTipsContainer(result);
        makePaginationTips(result);
        changeTipsPage(0);
    })
}
//#endregion

//#region ANSWER
function addToFaqsContainer(result) {
    let faqsContainer = document.querySelector('.faqs');
    faqsContainer.innerHTML =  '<h3>Preguntas</h3>';
    for(let i=0; i<result.length; i++){
        faqsContainer.innerHTML += `                <div class="question-container">
        <h5><img src="/images/users/${result[i].User.photo}" alt=""><b>${result[i].User.name}:</b>${result[i].Question.text} (PREGUNTA)</h5>
        <h6>${result[i].text} (RESPUESTA)</h6>
        </div>`
    }
    faqsContainer.innerHTML += `<form action="">
    <h4 class="mt-4">Si no encontraste la respuesta que estabas buscando, dejá tu pregunta.</h4>
    <textarea name="textarea" rows="3" cols="45">Preguntar...</textarea>
    <div class="d-flex justify-content-end">
    <button class="faqs-btn-submit" type="submit">Enviar pregunta</button>
    </div>
    </form>`
}
//#endregion

//#region ANSWER PAGINATION
function makePaginationAnswer(results){
    let amountOfPages = Math.ceil(results.length / amountByPage);
    let index = 0;
    let condition = amountByPage;
    answerArray = [];
    for(let j = 0; j < amountOfPages; j++){
        let page = [];
        for(let i = index; i <= condition-1; i++){
            if(results[i] != undefined){
                page.push(results[i]);
            }
        }
        condition += amountByPage;
        index += amountByPage;
        answerArray.push(page);
    }
}
function changeAnswerPage(moveTo){
    if(answerArray[actualAnswerPage] == null || answerArray[actualAnswerPage] == undefined) return ;
    (moveTo > 0) ? actualAnswerPage++ : actualAnswerPage--;
    if(moveTo == 0) actualAnswerPage = 0;
    
    let faqs = document.querySelector('.faqs');
    faqs.innerHTML = '';
    
    for(let i = 0; i < answerArray[actualAnswerPage].length; i++){
        faqs.innerHTML += `                <div class="question-container">
        <h5><img src="/images/users/${answerArray[actualAnswerPage][i].User.photo}" alt=""><b>${answerArray[actualAnswerPage][i].User.name}:</b>${answerArray[actualAnswerPage][i].Question.text} (PREGUNTA)</h5>
        <h6>${answerArray[actualAnswerPage][i].text} (RESPUESTA)</h6>
        </div>
        `;
    }
    faqs.innerHTML += `<div class="paginationAnswerContainer"></div>
        <form action="">
        <h4 class="mt-4">Si no encontraste la respuesta que estabas buscando, dejá tu pregunta.</h4>
        <textarea name="textarea" rows="3" cols="45">Preguntar...</textarea>
        <div class="d-flex justify-content-end">
        <button class="faqs-btn-submit" type="submit">Enviar pregunta</button>
        </div>
    </form>`;
    
    let paginationAnswerContainer = document.querySelector('.paginationAnswerContainer');
    
    if(actualAnswerPage > 0){
        paginationAnswerContainer.innerHTML = `
        <button onclick="changeAnswerPage(-1)">Anterior</button>
        `;
    }
    if(actualAnswerPage < answerArray.length-1){
        paginationAnswerContainer.innerHTML = `
        <button onclick="changeAnswerPage(1)">Siguiente</button>
        `;
    }
}

//#endregion


//#region TIPS
function addToTipsContainer(result) {
    let tipsContainer = document.querySelector('.tips-container');
    tipsContainer.innerHTML =  '<h3>Tips</h3>';
    for(let i=0; i<result.length; i++){
        console.log(result);
        tipsContainer.innerHTML += `<div class="tips">
            <p><img src="/images/users/${result[i].User.photo}" alt=""><b>${result[i].User.name}:</b></p>
            <p>${result[i].tip}</p>
        </div>
        `;
    }
}
//#endregion

//#region TIPS PAGINATION
function makePaginationTips(results){
    let amountOfPages = Math.ceil(results.length / amountByPage);
    let index = 0;
    let condition = amountByPage;
    tipsArray = [];
    for(let j = 0; j < amountOfPages; j++){
        let page = [];
        for(let i = index; i <= condition-1; i++){
            if(results[i] != undefined){
                page.push(results[i]);
            }
        }
        condition += amountByPage;
        index += amountByPage;
        tipsArray.push(page);
    }
}
function changeTipsPage(moveTo){
    if(tipsArray[actualTipsPage] == null || tipsArray[actualTipsPage] == undefined) return ;
    (moveTo > 0) ? actualTipsPage++ : actualTipsPage--;
    if(moveTo == 0) actualTipsPage = 0;
    
    let tips = document.querySelector('.tips-container');
    tips.innerHTML = '';
    
    for(let i = 0; i < tipsArray[actualTipsPage].length; i++){
        tips.innerHTML += `<div class="tips">
        <h5><img src="/images/users/${tipsArray[actualTipsPage][i].User.photo}" alt=""><b>${tipsArray[actualTipsPage][i].User.name}:
        </b>${tipsArray[actualTipsPage][i].tip}</h5>
        </div>
        `;
    }
    tips.innerHTML += `<div class="paginationTipsContainer"></div>`;
    
    let paginationTipsContainer = document.querySelector('.paginationTipsContainer');
    
    if(actualTipsPage > 0){
        paginationTipsContainer.innerHTML = `
        <button onclick="changeTipsPage(-1)">Anterior</button>
        `;
    }
    if(actualTipsPage < tipsArray.length-1){
        paginationTipsContainer.innerHTML = `
        <button onclick="changeTipsPage(1)">Siguiente</button>
        `;
    }
}

//#endregion







//#region CAREERS CONTAINER
function addToContainer(careers, institutionType){
    let container = document.querySelector('.carreers-container');
    if(careers.length > 0){
        container.innerHTML = '';
        container.innerHTML+= ` <div class="carreers-h4-container">
        <h4>Carreras Disponibles</h4>
        </div>
        <div class="carreers-btn" id="careersContainer">         
        </div>`;
    }
    
    let careersContainer = document.querySelector('#careersContainer');
    careersContainer.innerHTML = '';
    
    for(let i = 0; i < careers.length; i++ ){
        careersContainer.innerHTML += `<button onclick="fetchStudiesManager(${careers[i].id}, '${institutionType}')">${careers[i].name}</button>`
    }
    
}
//#endregion

//#region CHANGE RIGHT INFO
function changeUsefulInformation(data, career){
    
    let infoContainer = document.querySelector('.information-container');
    
    if(data != null){
        infoContainer.innerHTML = `
        <h3>Informacion útil</h3>
        <ul id="links-container">
        <li><a id="web-page-link" href="">Pagina web</a></li>
        <li id="adress-data"><a id="map-link" href="">Mapa</a></li>
        </ul>
        
        <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105083.85891257568!2d-58.51286837494019!3d-34.60743372073798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb430ebd761df%3A0xe3c33a8b19ce6c7!2sUniversidad%20Torcuato%20Di%20Tella!5e0!3m2!1ses-419!2sar!4v1599014780798!5m2!1ses-419!2sar" width="200" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        `;
    }
    
    let webPageLink = document.querySelector('#web-page-link');
    
    let mapLink = document.querySelector('#map-link');
    let adressData = document.querySelector('#adress-data');
    
    webPageLink.href = data.link;
}
//#endregion

//#region STUDENTS OPINIONS
function showStudentsOpinions(opinions){
    let opinionsDiv = document.querySelector('.opinions');
    makePagination(opinions);
    changePage(0);    
}
//#endregion

//#region PAGINATION GENERAL

function makePagination(results){
    let amountOfPages = Math.ceil(results.length / amountByPage);
    let index = 0;
    let condition = amountByPage;
    opinionsOnGeneral = [];
    for(let j = 0; j < amountOfPages; j++){
        let page = [];
        
        for(let i = index; i <= condition-1; i++){
            if(results[i] != undefined){
                page.push(results[i]);
            }
        }
        condition += amountByPage;
        index += amountByPage;
        opinionsOnGeneral.push(page);
        
    }
}

function changePage(moveTo){
    if(opinionsOnGeneral[actualGeneralPage] == null || opinionsOnGeneral[actualGeneralPage] == undefined) return ;
    (moveTo > 0) ? actualGeneralPage++ : actualGeneralPage--;
    if(moveTo == 0) actualGeneralPage = 0;
    
    let opinionsDiv = document.querySelector('.opinions');
    opinionsDiv.innerHTML = `
    <h4>Opiniones Estudiantiles</h4>
    <section id="opinionsContainer">
    </section>
    <div class="paginationContainer">
    
    </div>
    `;
    
    let opinionsContainer = document.querySelector('#opinionsContainer');
    opinionsContainer.innerHTML = '';
    
    for(let j = 0; j < opinionsOnGeneral[actualGeneralPage].length; j++){
        opinionsContainer.innerHTML += `
        <article>
        <h6><img src="/images/users/${opinionsOnGeneral[actualGeneralPage][j].User.photo}" alt="">${opinionsOnGeneral[actualGeneralPage][j].User.name}</h6>
        <p>${opinionsOnGeneral[actualGeneralPage][j].opinion}</p>
        </article>
        `;
    }
    
    let paginationContainer = document.querySelector('.paginationContainer');
    
    if(actualGeneralPage > 0){
        paginationContainer.innerHTML = `
        <button onclick="changePage(-1)">Anterior</button>
        `;
    }
    if(actualGeneralPage < opinionsOnGeneral.length-1){
        paginationContainer.innerHTML = `
        <button onclick="changePage(1)">Siguiente</button>
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
                    universityResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${universities[i].id}" onclick="fetchInstitutionManager(${universities[i].id}, 'university')">  <button>${universities[i].name}</button> </option>`;
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
                    instituteResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${institutes[i].id}" onclick="fetchInstitutionManager(${institutes[i].id}, 'institute')">  <button>${institutes[i].name}</button> </option>`;
                }
            }
            
            if(amountOfResults <= 0) instituteResults.innerHTML = 'No se encontraron resultados';
        }
    });
    //#endregion
});