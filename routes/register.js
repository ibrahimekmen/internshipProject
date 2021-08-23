const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/authenticationController.js');


router.post('/', (req,res,next)=>{
    signUpController.signUp(req,res,next);
});

module.exports = router;