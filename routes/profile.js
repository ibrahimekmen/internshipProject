const express = require('express');
const router = express.Router();
const mid = require("../middleWare");
const profilePageController = require('../controllers/profilePageController.js');

router.get('/',mid.requiresLogin, (req,res,next)=>{
    profilePageController.profilePage(req,res,next);
});

module.exports = router;