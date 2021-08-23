const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/authenticationController.js');

router.get("/",(req,res,next)=>{
    logoutController.logout(req,res,next);
});

module.exports = router;