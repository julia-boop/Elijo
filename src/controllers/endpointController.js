const { response } = require('express');
const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

module.exports = {
    getCareers: async (req, res) => {
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