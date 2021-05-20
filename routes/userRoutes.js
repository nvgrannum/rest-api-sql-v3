'use strict';

const express = require('express');
const { User } = require('../models');
const {authenticateUser} = require('../middleware/auth-user')

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
  

// Route that returns the authorized user.
router.get('/', authenticateUser, asyncHandler(async(req,res)=>{
    const user = req.currentUser;

    res.status(200).json({
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.emailAddress,
      userId:user.id
    })
}))
  
// Route that creates a new user.
router.post('/', asyncHandler(async (req, res) => {
  let user;
  try {
    user = await User.create(req.body);
    console.log(user);
    res.status(201).location('/').end();
  } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
    } else {
        throw error;
    }
  }
}));
  
module.exports = router;