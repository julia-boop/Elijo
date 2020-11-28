const db = require('../database/models');

async function universitySearch(query){
    if(query.universities != undefined){
        let foundUniversities = [];
        for(let i = 0 ; i < query.univerisities.length ; i ++){
            let universities = await db.University.findByPk({
                where : {
                    id : query.universities[i]
                }
            })
            .catch(function(e){
                res.send(e)
            })
        }
    }
    console.log('---------------------------'+ universities)
    return universities;
}



module.exports = function(query){


    return universitySearch(query)


}