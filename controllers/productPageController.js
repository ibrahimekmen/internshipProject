const productServices = require('../services/productServices.js');

function render(req,res){
    const productName = req.params.productName.replace("$","/");
    const { category } = req.params;
    let gender = category.split("-")[0];
    gender = gender.replace("s","");
    gender = gender[0].toUpperCase() + gender.slice(1);

    const results = differentiateGender(req,gender);
    const categories = results[0];
    const subCategories = results[1];
    
    productServices.getProductByName(productName).then(data =>{
        res.render('product',{
            gender: gender,
            product: data[0],    
            breadcrumbs: req.breadcrumbs,
            categories: categories,
            subcategories: subCategories,
            message: req.flash('message')
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
    render
}