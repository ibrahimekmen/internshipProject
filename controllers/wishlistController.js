const wishlistServices = require('../services/wishlistServices.js');
const productServices = require('../services/productServices.js');

async function renderWishlist(req,res){
    var token = req.cookies.user.token;
    await matchProductIds(token).then(data => {
        res.render('wishlist',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: req.womenNavbar[0],
            subcategories: req.womenNavbar[1],
            user : req.cookies.user.user,
            wishlistItems : data,
            message: req.flash('message')
        });
    }).catch(err=>{
        console.log(err);
        res.render("error",err.error);
    });
}

function addToWishlist(req,res,next){
    var token = req.cookies.user.token;
    addToWishlistData = {
        token : token,
        quantity : req.body.quantity,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    wishlistServices.addToWishlist(addToWishlistData).then( (data) => {
        req.flash('message', 'Item added to the wishlist');
        res.redirect('back');
    }).catch(err=>{
        next(err);
    });
}

async function matchProductIds(token){
    const wishlistItems = await wishlistServices.getWishlist(token).then(data => data);
    if(wishlistItems.error === 'There is no wishlist created for this user'){
        return null;
    }else{
        const promises = wishlistItems.items.map(async wishlistItem => {
            const tempProduct = await productServices.getProductById(wishlistItem.productId);
            const tempImage = tempProduct[0].image_groups.filter(images => images.view_type == 'large' && images.variation_value == wishlistItem.variant.variation_values.color)[0].images;
            const tempProductVariations = [];
    
            const variationKeys = Object.keys(wishlistItem.variant.variation_values);   // variation keys holds values like color size etc
            variationKeys.forEach((variationAttribute,index) => { // iterate through values like color : JJXX02J  or size : 106 ------------- variation attribute is color size etc
                let tempVariation = tempProduct[0].variation_attributes.filter(var_attr => var_attr.id == variationAttribute); // choose color or size or width ----- iterate through a products variation attributes to match names with values
                let result =  tempVariation[0].values.filter(value => value.value == wishlistItem.variant.variation_values[variationAttribute])[0].name; // get the value of the variation yellow green or 160 etc
                tempProductVariations.push({
                    "variation_name" :  tempVariation[0].name,
                    "variation_value" : result
                })
            });
            
            const modifiedProduct = {
                "product" : tempProduct,
                "variation" : wishlistItem.variant,
                "images" : tempImage,
                "variationValues" : tempProductVariations,
                "quantity" : wishlistItem.quantity
            };
            
            return modifiedProduct;
        });
    
        const endProducts = await Promise.all(promises);
        return endProducts;
    } 
}

function removeFromWishlist(req,res,next){
    var token = req.cookies.user.token;
    var removeFromWishlistData = {
        token : token,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    wishlistServices.removeFromWishlist(removeFromWishlistData).then((data) => {
        req.flash('message', 'Item removed from the wishlist');
    })
    .then(() => {
        res.redirect('back');
    })
    .catch(err=>{
        next(err);
    });
}

module.exports = {
    renderWishlist,
    addToWishlist,
    removeFromWishlist
}