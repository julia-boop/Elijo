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
            
            let chartJSContainer = document.querySelector('.chartJS');
            chartJSContainer.innerHTML = `Calificación: ${result.calification}`;
            

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
    let dataPostaContainer = document.querySelector('.data-posta-container');
    dataPostaContainer.innerHTML = '';
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
            updateChart(result);

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
        return response.json();
    })
    .then(result => {
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
    
    let data = 'U:1,C:1'/*onCategories(result[0])*/;

    faqsContainer.innerHTML += `<div id="question-form">
    <h4 class="mt-4">Si no encontraste la respuesta que estabas buscando, dejá tu pregunta.</h4>
    <textarea id="textarea-question" name="textarea" rows="3" cols="45" placeholder="Preguntar..."></textarea>
    <div class="d-flex justify-content-end">
    <button class="faqs-btn-submit" type="button" onClick="sendQuestion('${data}')">Enviar pregunta</button>
    </div>
    </div>`
}

function onCategories(data){
    let {university_id, career_id, institute_id, course_id} = data;
    let results = '';
    if(university_id != null) results += 'U:university_id,';
    if(institute_id != null) results += 'I:institute_id,';
    if(career_id != null) results += 'C:career_id,';
    if(course_id != null) results += 'CO:course_id,';

    return results;
}
//#endregion

//#region SEND QUESTION
function sendQuestion(ids){
    let formData = document.querySelector('#textarea-question');
    let postSuccess = document.querySelector('#question-success');
    if(formData.value.trim() !== ''){
        fetch('/endpoints/publishQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: formData.value, ids: ids})
        });
        postSuccess.classList.remove('d-none');
        setTimeout(() => {
            postSuccess.classList.add('d-none');
            formData.value = '';
        }, 2000)
    }
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
        faqs.innerHTML += `<div class="question-container">
        <img src="/images/users/${answerArray[actualAnswerPage][i].User.photo}" alt="">
        <h5>P: <b>${answerArray[actualAnswerPage][i].User.name}:</b>${answerArray[actualAnswerPage][i].Question.text}</h5>
        <h5 class="response-h5">R: ${answerArray[actualAnswerPage][i].text}</h5>
        </div>
        `;
    }
    
    faqs.innerHTML += `<div class="paginationAnswerContainer"></div>
        <form action="">
        <h4 class="mt-4">Si no encontraste la respuesta que estabas buscando, dejá tu pregunta.</h4>
        <textarea name="textarea" rows="3" cols="45" placeholder="Preguntar..."></textarea>
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
        <img src="/images/users/${tipsArray[actualTipsPage][i].User.photo}" alt="">
        <h5>${tipsArray[actualTipsPage][i].User.name}:
         ${tipsArray[actualTipsPage][i].tip}</h5>
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
        <li><a id="web-page-link" href="">Sitio web</a></li>
        <li id="address-data"><a id="map-link" href="">Mapa</a></li>
        </ul>`
    
    }

    // <div class="map-container">
    // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105083.85891257568!2d-58.51286837494019!3d-34.60743372073798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb430ebd761df%3A0xe3c33a8b19ce6c7!2sUniversidad%20Torcuato%20Di%20Tella!5e0!3m2!1ses-419!2sar!4v1599014780798!5m2!1ses-419!2sar" width="200" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    // </div>
    // `;
    
    let webPageLink = document.querySelector('#web-page-link');
    
    let mapLink = document.querySelector('#map-link');
    let addressData = document.querySelector('#address-data');
    
    webPageLink.href = data.link;
    addressData.href = data.address;
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

//#region CHARTJS
function updateChart(data){
    let institutionName = '';
    if(data.Universities != undefined){
        institutionName = data.Universities.acronym
    }else{
        institutionName = data.Institutes.name
    }

    let title = `${institutionName.toUpperCase()} - ${data.name.toUpperCase()}`;

    let chartJSContainer = document.querySelector('.chartJS');

    chartJSContainer.innerHTML = '<canvas id="myChart"></canvas>';

    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Precio', 'Salida Laboral', 'Horas de Estudio', 'Dificultad', 'Duracion'],
            datasets: [{
                label: `${title}`,
                backgroundColor: 'rgb(14,155,218)',
                borderColor: 'rgb(124,191,182)',
                data: [data.price, data.job_exit, data.study_hours, data.difficulty, data.duration]
            }]
        },
        options: {}
    });
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



    /*
    questionForm.addEventListener('submit', event => {
        event.preventDefault();
        console.log(formData.value);
        if(formData.value.trim() !== ''){
            fetch('/endpoints/publishQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: formData.value})
            })
            .then(response => {
                postSuccess.classList.remove('d-none');
                setTimeout(() => {
                    postSuccess.classList.add('d-none');
                }, 2000)
            })
            .catch(err => {
                console.log(err);
            })
        }
    });*/
    
});

