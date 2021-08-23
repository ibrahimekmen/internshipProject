const express = require('express');
const router = express.Router();
const loginController = require('../controllers/authenticationController.js');


router.post('/', (req,res,next)=>{
    loginController.login(req,res,next);
});

module.exports = router;