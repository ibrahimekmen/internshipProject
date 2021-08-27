const express = require('express');
const router = express.Router();
const mid = require("../middleWare");
const wishlistController = require('../controllers/wishlistController');

router.get('/',mid.requiresLogin,(req,res)=>{
    wishlistController.renderWishlist(req,res);
});

router.post('/',mid.requiresLogin,(req,res,next)=>{
    wishlistController.addToWishlist(req,res,next);
});

router.post('/delete',mid.requiresLogin,(req,res,next) =>{
    wishlistController.removeFromWishlist(req,res,next);
});

module.exports = router;