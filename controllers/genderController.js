const productServices = require('../services/productServices.js');

function renderMain(req,res,gender){
    const results = differentiateGender(req,gender);
    const categories = results[0];
    const subCategories = results[1];

    res.render('index',{
        gender: gender,
        categories: categories,
        subcategories: subCategories,
        currentRoute: gender,
        breadcrumbs: req.breadcrumbs
    });
}

function renderSubcategories(req,res,gender){
    const results = differentiateGender(req,gender);
    console.log(results[0]);
    const categories = results[0];
    const subCategories = results[1];

    const { category } = req.params;
    productServices.getProductsByCategory(category).then(data =>{
        res.render('subcategory',{
            gender: gender,
            products: data,
            currentRoute: category,
            breadcrumbs: req.breadcrumbs,
            categories: categories,
            subcategories: subCategories
        });
    }).catch(err=>{
        console.log(err);
    });
}

function differentiateGender(req,gender){
    var categories;
    var subCategories;
    if(gender === "Men"){
        categories = req.menNavbar[0];
        subCategories = req.menNavbar[1];
    }else{
        categories = req.womenNavbar[0];
        subCategories = req.womenNavbar[1];
    }
    var results = [categories,subCategories];
    return results;
}

module.exports = {
    renderMain,
    renderSubcategories
}
