const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');

router.get('/', (req,res,next)=>{
    searchController.render(req,res,next);
});

module.exports = router;