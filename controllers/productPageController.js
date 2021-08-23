const productServices = require('../services/productServices.js');

function render(req,res){
    const { productName } = req.params;
    productServices.getProductByName(productName).then(data =>{
        res.render('product',{
            gender: "Men",
            product: data[0],    
            breadcrumbs: req.breadcrumbs,
            categories: req.menNavbar[0],
            subcategories: req.menNavbar[1]
        });
    }).catch(err=>{
        console.log(err);
    });
}

module.exports = {
    render
}