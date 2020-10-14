const fs = require('fs');
const path = require('path');   
const db = require('../database/models');


module.exports = {
    showUniversityForm : (req, res) => {
        res.render('universityForm');
    },
    saveNewUniversity : async (req, res) => {
        
        let newUniversity = {
            name: req.body.university_name,
            acronym: req.body.university_acronym,
            link: req.body.university_link,
            price: req.body.university_price,
            calification: req.body.university_calification,
            adress: req.body.university_adress,
            location: req.body.university_location,
            region: req.body.university_region,
            logo: (req.files[0] == undefined) ? 'no-image.jpg' : req.files[0].filename,
            amount_students: req.body.university_amount_students,
            created_at: new Date(),
            updated_at: new Date()
        };
        let university = await db.University.create(newUniversity);
        res.redirect('/population/addCareerAsignature/' + university.id);
        //return res.send(university);
    },
    showCareerAndAsignatureForm : (req, res) => {
        let universityId = req.params.universityId;
        res.render('careerAsignatureForm', {universityId});
    },
    addCareerAndASignatures : async (req, res) => {
        
        let newCareer = {
            name: req.body.career_name,
            plan_link: req.body.career_plan_link,
            price: req.body.career_price,
            calification: req.body.career_calification,
            duration: req.body.career_duration,
            difficulty: req.body.career_difficulty,
            job_exit: req.body.career_job_exit,
            study_hours: req.body.career_study_hours,
            university_id: req.params.universityId,
            created_at: new Date(),
            updated_at: new Date()
        };
        let career = await db.Career.create(newCareer);

        if(req.body.amount_asignatures == '1' || req.body.amount_asignatures == 1){
            let newAsignature = {
                name: req.body.asignature_name,
                asignature_year: req.body.asignature_year,
                career_id: career.id,
                created_at: new Date(),
                updated_at: new Date()
            };
            let asignature = await db.Asignature.create(newAsignature);
        } else {
            for(let i = 0; i < req.body.amount_asignatures; i++){
                let newAsignature = {
                    name: req.body.asignature_name[i],
                    asignature_year: req.body.asignature_year[i],
                    career_id: career.id,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                let asignature = await db.Asignature.create(newAsignature);
            }
        }

        if(req.body.newCareer == 'si'){
            res.redirect('/population/addCareerAsignature/'+ req.params.universityId);
        }else{
            res.redirect('/population/university');
        }
    },
    showInstituteForm : (req, res) => {
        res.render('instituteForm');
    },
    saveNewInstitute : async (req, res) => {
        let newInstitute = {
            name: req.body.institute_name,
            link: req.body.institute_link,
            price: req.body.institute_price,
            calification: req.body.institute_calification,
            adress: req.body.institute_adress,
            location: req.body.institute_location,
            region: req.body.institute_region,
            logo: (req.files[0] == undefined) ? 'no-image.jpg' : req.files[0].filename,
            amount_students: req.body.institute_amount_students,
            created_at: new Date(),
            updated_at: new Date()
        };
        let institute = await db.Institute.create(newInstitute);
        
        if(req.body.courses_amount == '1' || req.body.courses_amount == 1){
            let newCourse = {
                name: req.body.course_name,
                plan_link: req.body.course_plan_link,
                price: req.body.course_price,
                calification: req.body.course_calification,
                duration: req.body.course_duration,
                difficulty: req.body.course_difficulty,
                job_exit: req.body.course_job_exit,
                study_hours: req.body.course_study_hours,
                institute_id: institute.id,
                created_at: new Date(),
                updated_at: new Date()
            };
            let course = db.Course.create(newCourse);
        } else {
            for(let i = 0; i < req.body.courses_amount; i++){
                let newCourse = {
                    name: req.body.course_name[i],
                    plan_link: req.body.course_plan_link[i],
                    price: req.body.course_price[i],
                    calification: req.body.course_calification[i],
                    duration: req.body.course_duration[i],
                    difficulty: req.body.course_difficulty[i],
                    job_exit: req.body.course_job_exit[i],
                    study_hours: req.body.course_study_hours[i],
                    institute_id: institute.id,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                let course = db.Course.create(newCourse);
            }
        }
        
        res.redirect('/population/institute');
    }
}