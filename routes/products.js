const express = require('express');
const router = express.Router({mergeParams: true});
const productPageController = require('../controllers/productPageController');

router.get('/:productName',(req,res) => {
    productPageController.render(req,res);
});

module.exports = router;