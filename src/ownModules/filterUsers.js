const db = require('../database/models');

//#region FILTER AGE
function filterByAge(users, query){
    let newQuery = [];
    for(let i = 0; i < query.length; i++){
        newQuery.push(query[i].split('-'));
        
    } 

    let usersByAge = [];
    for(let i = 0; i < newQuery.length;i++){
        for(let j = 0; j < users.length; j++){
            if(Number(newQuery[i][0]) < users[j].age && Number(newQuery[i][1]) > users[j].age){
                usersByAge.push(users[j]);
            }
        }
    }
    return usersByAge;
}
//#endregion

function filterByUniversity(users, query){

    let usersByUniversity = [];

        for(let i = 0 ; i < users.length ; i++){
            for(let j = 0 ; j < query.length ; j++){
               if(users[i].User_careers != undefined){
                   for(let k = 0 ; k < users[i].User_careers.length ; k++){
                       if(users[i].User_careers[k].university_id == Number(query[j])){
                           usersByUniversity.push(users[i]);
                       }
                   }
               }               
            }
        }
    return usersByUniversity;
}

function filterByCareer(users, query){

    let usersByCareer = [];

    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_careers != undefined){
                for(let k = 0 ; k < users[i].User_careers.length ; k++){
                    if(users[i].User_careers[k].user_careers.career_id == Number(query[j])){
                        usersByCareer.push(users[i]);
                    }
                }
            }
        }
    }

    return usersByCareer;
}

function filterByInstitute(users, query){
    let usersByInstitute = [];

    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_courses != undefined ){                
                for(let k = 0 ; k < users[i].User_courses.length ; k++){
                    if(users[i].User_courses[k].institute_id == Number(query[j])){    
                        console.log('ok');                    
                        usersByInstitute.push(users[i])
                    }
                }
            }
        }
    }

    return usersByInstitute;
}

function filterByCourse(users, query){

    let usersByCourse = [];

    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_courses != undefined){
                for(let k = 0 ; k < users[i].User_courses.length ; k++){
                    if(users[i].User_courses[j].id == Number(query[j])){
                        usersByCourse.push(users[i])
                        console.log('ok')
                    }
                }
            }
        }
    }

    return usersByCourse;
    
}

//#region FILTER GENRE
function filterByGenre(users, query){
    let usersByGenre = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].genre_id == Number(query[j])){
                usersByGenre.push(users[i]);
            }
        }
    }
    return usersByGenre;
}
//#endregion 

//FILTER BY CAREER YEAR
function filterByCareerYear(users, query){
    let usersByYear = [];

    for(let i = 0 ; i < users.length ; i++){
        for(let k = 0 ; k < users[i].User_careers.start_year.length ; k++){
            if(users[i].User_careers[j].start_year == Number(query[j])){
                usersByYear.push(users[i])
            }
        }
    }
//Creo que es  users[i].User_careers[j].user_careers.start_year (no trae start_year ATT!!!)
}
// /FILTER BY CAREER YEAR

//FILTER PROVINCE
function filterByProvince(users, query){
    let usersByProvince = [];

    for(let i=0; i<users.length; i++){
        for(let j=0; j< query.length; j++){
            if(users[i].province.toLowerCase() == query[j].toLowerCase()){
                usersByProvince.push(users[i]);
            }
        }
    }
    return usersByProvince;
}
//END FILTER PROVINCE


module.exports = function (users, queries){
    let usersFiltered = users;

    if(queries.age != undefined) usersFiltered = filterByAge(usersFiltered, queries.age);

    if(queries.university != undefined) usersFiltered = filterByUniversity(usersFiltered, queries.university);

    if(queries.career != undefined) usersFiltered = filterByCareer(usersFiltered, queries.career);

    if(queries.institutes != undefined) usersFiltered = filterByInstitute(usersFiltered, queries.institutes);
    
    if(queries.courses != undefined) usersFiltered = filterByCourse(usersFiltered, queries.courses);

    if(queries.genero != undefined) usersFiltered = filterByGenre(usersFiltered, queries.genero);

    if(queries.year != undefined) usersFiltered = filterByCareerYear(usersFiltered, queries.year);

    if(queries.province != undefined) usersFiltered = filterByProvince(usersFiltered, queries.province);


    return usersFiltered;
}


