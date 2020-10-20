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
    
}

function filterByCareer(users, query){

}

function filterByInstitute(users, query){

}

function filterByCourse(users, query){
    
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

function filterByCareerYear(users, query){

}


module.exports = function (users, queries){
    let usersFiltered = users;

    if(queries.age != undefined) usersFiltered = filterByAge(usersFiltered, queries.age);

    if(queries.university != undefined) usersFiltered = filterByUniversity(usersFiltered, queries.university);

    if(queries.career != undefined) usersFiltered = filterByCareer(usersFiltered, queries.career);

    if(queries.institute != undefined) usersFiltered = filterByInstitute(usersFiltered, queries.institute);
    
    if(queries.course != undefined) usersFiltered = filterByCourse(usersFiltered, queries.course);

    if(queries.genero != undefined) usersFiltered = filterByGenre(usersFiltered, queries.genero);

    if(queries.year != undefined) usersFiltered = filterByCareerYear(usersFiltered, queries.year);


    return usersFiltered;
}


