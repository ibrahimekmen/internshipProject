const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');

router.get('/', (req,res)=>{
    searchController.render(req,res);
});

module.exports = router;