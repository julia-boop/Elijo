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
                institute_id: req.params.universityOwner
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
            }
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
            }
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
    }
};