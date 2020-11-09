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
        console.log(req.params.universityID);
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