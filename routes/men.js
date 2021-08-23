const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const productRouter = require('./products.js');
const genderController = require('../controllers/genderController.js');

router.use('/:category/product',productRouter);

router.get('/', (req,res)=>{
    genderController.renderMain(req,res,'Men');
});

router.get('/:category',(req,res)=>{
    genderController.renderSubcategories(req,res,'Men');
});

module.exports = router;