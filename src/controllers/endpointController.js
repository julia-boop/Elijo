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
        });
        return res.status(200).json(careers);
    },
    getCourses: async (req, res) => {
        let courses = await db.Course.findAll({
            where: {
                institute_id: req.params.instituteOwner
            }
        });
        return res.status(200).json(courses);
    }
};