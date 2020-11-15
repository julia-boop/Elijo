const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

module.exports = {
    getCareers: async (req, res) => {
        console.log(req.params.universityOwner);
        let careers = await db.Career.findAll({
            where: {
                university_id: req.params.universityOwner
            }
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(careers);
    },
    getCourses: async (req, res) => {
        let courses = await db.Course.findAll({
            where: {
                institute_id: req.params.instituteOwner
            }
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(courses);
    },
    getUniversities: async (req, res) => {
        let universities = await db.University.findAll()
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(universities);
    },
    getInstitutes: async (req, res) => {
        let institutes = await db.Institute.findAll()
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(institutes);
    },
    getInstitutionByRegion: async (req, res) => {
        let institutions = [];
        let universities = await db.University.findAll({
            include: [
                {
                    association: 'University_location',
                    where: {
                        province: req.params.region
                    }
                }
            ]
        })
        let institutes = await db.Institute.findAll({
            where: {
                region: req.params.region
            }
        })
        institutions = [
            ...universities,
            ...institutes
        ]
        return res.status(200).json(institutions);
    },
    getSpecificInstitutes: async (req, res) => {
        let institute = await db.Institute.findOne({
            where: {
                id: req.params.instituteID
            }
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(institute);
    },
    getSpecificUniversities: async (req, res) => {
        let university = await db.University.findOne({
            where: {
                id: req.params.universityID
            }
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(university);
    },
    getSpecificCareer: async (req, res) => {
        let career = await db.Career.findOne({
            where: {
                id: req.params.careerID
            },
            include: [{association: 'Universities'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(career);
    },
    getSpecificCourse: async (req, res) => {
        let course = await db.Course.findOne({
            where: {
                id: req.params.courseID
            },
            include: [{association: 'Institutes'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(course);
    },
    getInstituteOpinions: async (req, res) => {
        let opinions = await db.Calification.findAll({
            where: {
                institute_id: req.params.instituteID
            }
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(opinions);
    },
    getUniversityOpinions: async (req, res) => {
        let opinions = await db.Calification.findAll({
            where: {
                university_id: req.params.universityID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(opinions);
    },
    getCourseOpinions: async (req, res) => {
        let opinions = await db.Calification.findAll({
            where: {
                curse_id: req.params.courseID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(opinions);
    },
    getCareerOpinions: async (req, res) => {
        let opinions = await db.Calification.findAll({
            where: {
                career_id: req.params.careerID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(opinions);
    },
    getActualUser: async (req, res) => {
        let user = await db.User.findByPk(req.session.userSession)
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(user);
    },
    getInterestsTable: async (req, res) => {
        let interests = await db.Interest.findAll()
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(interests);
    },
    getInstituteQuestions: async (req,res) => {
        let instituteQuestions = await db.Question.findAll({
            where: {
                institute_id: req.params.instituteID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(instituteQuestions);
    },
    getUniversityQuestions: async (req, res) => {
        let universityQuestions = await db.Question.findAll({
            where : {
                university_id: req.params.universityID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(universityQuestions);
    },
    getCareerQuestions: async (req, res) => {
        let careerQuestions = await db.Question.findAll({
            where : {
                career_id : req.params.careerID
            }, 
            include: [{association: 'User'}]
        })        
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(careerQuestions);
    },
    getCourseQuestions: async (req, res) => {
        let courseQuestions = await db.Question.findAll({
            where : {
                course_id : req.params.courseID
            }, 
            include: [{association: 'User'}]
        })        
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(courseQuestions);
    },
    getInstituteTips: async (req,res) => {
        let instituteTips = await db.Tips.findAll({
            where: {
                institute_id: req.params.instituteID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(instituteTips);
    },
    getUniversityTips: async (req, res) => {
        let universityTips = await db.Tip.findAll({
            where : {
                university_id: req.params.universityID
            },
            include: [{association: 'User'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(universityTips);
    },
    getCareerTips: async (req, res) => {
        let careerTips = await db.Tip.findAll({
            where : {
                career_id : req.params.careerID
            }, 
            include: [{association: 'User'}, {association: 'University'}]
        })        
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(careerTips);
    },
    getCourseTips: async (req, res) => {
        let courseTips = await db.Tip.findAll({
            where : {
                course_id : req.params.courseID
            }, 
            include: [{association: 'User'}, {association: 'Institute'}]
        })        
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(courseTips);
    },
    getQuestions: async (req, res) => {
        let allQuestions = await db.Question.findAll()
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(allQuestions);
    },
    getAnswers: async (req, res) => {
        let allAnswers = await db.Answer.findAll({
            include: [{association: 'User'},{association: 'Question'}]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(allAnswers);
    },
    getInstituteAnswers: async (req,res) => {
        let instituteAnswers = await db.Answer.findAll({
            include: [{association: 'User'}, 
            {
                association: 'Question', 
                where: {
                    institute_id: req.params.instituteID
                }
            }]
        })
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(instituteAnswers);
    },
    getUniversityAnswers: async (req, res) => {
        let universityAnswers = await db.Answer.findAll({
            include: [{association: 'User'}, 
            {
                association: 'Question', 
                where: {
                    university_id: req.params.universityID
                }
            }]
        })   
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(universityAnswers);
    },
    getCareerAnswers: async (req, res) => {
        let careerAnswers = await db.Answer.findAll({
            include: [{association: 'User'}, 
            {
                association: 'Question', 
                where: {
                    career_id: req.params.careerID
                }
            }]
        })           
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(careerAnswers);
    },
    getCourseAnswers: async (req, res) => {
        let courseAnswers = await db.Answer.findAll({
            include: [{association: 'User'}, 
            {
                association: 'Question', 
                where: {
                    course_id: req.params.courseID
                }
            }]
        })        
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(courseAnswers);
    },
    getTips: async (req, res) => {
        let allTips = await db.Tip.findAll()
        .catch(err => {
            return res.status(404).json(err);    
        })
        return res.status(200).json(allTips);
    },
    onNewOpinion: async (req, res) => {
        let transporter = nodemailer.createTransport({
            host: "plesk.ar.conectemos.com",
            port: 25,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
        });
        let mailOptions = {
            from: 'usuario',
            to: 'equipo@elijo.org',
            subject: 'EN que mas te podemos ayudar',
            text: (req.body.data != '') ? req.body.data : 'EL usuario no agrego ningun mensaje'
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
    },
    publishQuestion: async (req, res) => {
        /*let ids = req.body.ids;

        ids = ids.split(',');
        console.log(ids);

        for(let i = 0; i < ids.length; i++){
            let tempData = ids[i].split(':');
        }*/
        let question = {
            university_id: (req.body.questionData[0] == 'university') ? req.body.questionData[1] : null,
            institute_id: (req.body.questionData[0] == 'institute') ? req.body.questionData[1] : null,
            career_id: (req.body.questionData[0] == 'career') ? req.body.questionData[1] : null,
            course_id: (req.body.questionData[0] == 'course') ? req.body.questionData[1] : null,
            user_id: req.session.userSession,
            state: 0,
            text: req.body.data
        }
        console.log(question);
        db.Question.create(question)
    }
};