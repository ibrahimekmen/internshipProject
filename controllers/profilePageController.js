const cartServices = require('../services/cartServices.js');


function profilePage(req,res,next){
    if(! req.session.userId){       
        var err = new Error("You must sign up to view your profile(if you already have a account)");
        err.status = 403;
        return next(err);
    }

    // token for calling wishlist and cart
    var token = req.session.user.token;

    Promise.all([cartServices.getCart(token)]).then(data =>{
        var cartError = false;
        var wishlistError = false;
        
        if(data[0].error){
            cartError = true;
        }
        
        // if(data[2].error){
        //     wishlistError = true;
        // }
        res.render('profile',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: req.womenNavbar[0],
            subcategories:req.womenNavbar[1],
            user : req.session.user.user,
            cartError: cartError,
            wishlistError : wishlistError,
            cart: data[0],
            wishlist: data[2],
            message: req.flash('message')
        });

    }).catch(err=>{
        console.log(err);
        res.render("error",err);
    });
}

module.exports = {
    profilePage
}