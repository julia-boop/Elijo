let universities;
let institutes;
let opinionsOnGeneral = [];
let actualGeneralPage = 0;
const amountByPage = 5;

let answerArray = [];
let actualAnswerPage = 0;

let tipsArray = [];
let actualTipsPage = 0;

let questionData = [];


let dataOnFilter = [];


window.addEventListener('load', () => {
    //#region INIT
    loadInstitutions();
    //#endregion
    
    //#region QUERY SELECTORS
    let universityInput = document.querySelector('.universityInput');
    let instituteInput = document.querySelector('.instituteInput');
    let universityResults = document.querySelector('.universityResults');
    let instituteResults = document.querySelector('.instituteResults');

    let regionButton = document.querySelector('#regionButton');
    let regionResults = document.querySelector('.regionResults');
    //#endregion
    
    //#region ONPageStart
    fetch('/endpoints/university').then(resp => resp.json())
    .then(universitiesToAdd => {
        universityResults.innerHTML = '';
        for(let i = 0; i < universitiesToAdd.length; i++){
            universityResults.innerHTML += `<option class="resultsOption" id="inputButton" value="${universitiesToAdd[i].id}" onclick="fetchInstitutionManager(${universitiesToAdd[i].id}, 'university')">${universitiesToAdd[i].name} </option>`;         
        }
    })

    fetch('/endpoints/institute').then(resp => resp.json())
    .then(institutesToAdd => {
        instituteResults.innerHTML = '';
        for(let i = 0; i < institutesToAdd.length; i++){
            instituteResults.innerHTML += `<option class="resultsOption" id="inputButton" value="${institutesToAdd[i].id}" onclick="fetchInstitutionManager(${institutesToAdd[i].id}, 'institute')">  ${institutesToAdd[i].name} </option>`;         
        }
    })
    //#endregion


    //#region NAV INPUTS
    regionButton.addEventListener('click', event => {
        fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(response => {
            return response.json()
        })
        .then(regions => {
            regions.provincias.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre === b.nombre ? 0 : 1)
            for(let i = 0; i < regions.provincias.length; i++){
                regionResults.innerHTML += `<button class="region-btn" value="${regions.provincias[i].nombre}" onClick="fetchRegionUniversities('${regions.provincias[i].nombre}')">  ${regions.provincias[i].nombre} </button>`;
            }
        });
    });

    universityInput.addEventListener('change', event => {
        let amountOfResults = 0;
        universityResults.innerHTML = ''; 
        if(event.target.value == '' || event.target.value == null){
            fetch('/endpoints/university').then(resp => resp.json())
            .then(universitiesToAdd => {
                console.log(universitiesToAdd);
                universityResults.innerHTML = '';
                for(let i = 0; i < universitiesToAdd.length; i++){
                    universityResults.innerHTML += `<option class="resultsOption" id="inputButton" value="${universitiesToAdd[i].id}" onclick="fetchInstitutionManager(${universitiesToAdd[i].id}, 'university')">  ${universitiesToAdd[i].name} </option>`;         
                }
                
                return;
            })
            
        }
        if(universities.length > 0){
            let inputData = event.target.value.toLowerCase();
            for(let i = 0; i < universities.length; i++){
                
                let univ = universities[i].name.toLowerCase();
                
                if(univ.includes(inputData.toLowerCase())){
                    amountOfResults++;
                    universityResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${universities[i].id}" onclick="fetchInstitutionManager(${universities[i].id}, 'university')">  ${universities[i].name} </option>`;
                }
            }
            console.log(amountOfResults);
            if(amountOfResults <= 0) universityResults.innerHTML = 'No se encontraron resultados';
        }
    });
    
    instituteInput.addEventListener('change', event => {
        let amountOfResults = 0;
        instituteResults.innerHTML = '';
        if(event.target.value == '' || event.target.value == null){
            instituteResults.innerHTML = '';  
            fetch('/endpoints/institute').then(resp => resp.json())
            .then(institutesToAdd => {
                instituteResults.innerHTML = '';
                for(let i = 0; i < institutesToAdd.length; i++){
                    instituteResults.innerHTML += `<option class="resultsOption" id="inputButton" value="${institutesToAdd[i].id}" onclick="fetchInstitutionManager(${institutesToAdd[i].id}, 'institute')">  ${institutesToAdd[i].name} </option>`;         
                }
            })       
            return;
        }
        if(institutes.length > 0){
            let inputData = event.target.value.toLowerCase();
            for(let i = 0; i < institutes.length; i++){
                
                let inst = institutes[i].name.toLowerCase();
                
                if(inst.includes(inputData.toLowerCase())){
                    amountOfResults++;
                    instituteResults.innerHTML +=`<option class="resultsOption" id="inputButton" value="${institutes[i].id}" onclick="fetchInstitutionManager(${institutes[i].id}, 'institute')">  ${institutes[i].name} </option>`;
                }
            }
            
            if(amountOfResults <= 0) instituteResults.innerHTML = 'No se encontraron resultados';
        }
    });
    //#endregion    
});

