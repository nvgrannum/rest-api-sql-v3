'use strict';

const express = require('express');
const { User, Course } = require('../models');
//const {authenticateUser} = require('../middleware/auth-user')

// Construct a router instance.
const router = express.Router();

function asyncHandler (cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  }
  

// Route that returns a list of courses.
router.get('/', asyncHandler(async(req,res)=>{
    const courses = await Course.findAll({
        include:[{
            model:User
        }]
    });
    res.status(200).json(courses)
  }))
  
  
  //GET specific course
    router.get('/:id', asyncHandler(async(req, res, next) => {
        const course = await Course.findByPk(
            req.params.id, 
            {include:[{
                model:User,
                attributes:["firstName", "lastName"]
            }]
        });
        if (course){
        res.status(200).json(course);
        } else {
        const error= new Error();
        error.message="Not Found";
        error.status=404;
        throw error
        }
    }));

    // Route that creates a new course.
  router.post('/', asyncHandler(async (req, res) => {
    try {
      await Course.create(req.body);
      res.status(201).location(`/${Course.id}`)
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));


    //Update specific course
    router.put('/:id', asyncHandler(async (req, res) => {
        let course;
        try {
            course = req.body;
            if(course) {
                await Course.update(course, {where:{id: req.params.id}});
                res.status(204).end(); 
            } else {
                res.sendStatus(404);
        }
        } catch (error) {
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors }); 
        } else {
            throw error;
        }
        }
    }));
  
  module.exports = router;