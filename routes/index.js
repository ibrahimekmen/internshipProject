const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const homeController = require('../controllers/homeController.js');

router.get('/', (req,res)=>{
    homeController.render(req,res);
});

module.exports = router;