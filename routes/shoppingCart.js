const express = require('express');
const router = express.Router();
const mid = require("../middleWare");
const shoppingCartController = require('../controllers/shoppingCartController.js');


router.get('/',mid.requiresLogin,(req,res)=>{
    shoppingCartController.renderShoppingCart(req,res);
});


router.post('/',mid.requiresLogin,(req,res,next)=>{
    shoppingCartController.addToCart(req,res,next);
});

module.exports = router;