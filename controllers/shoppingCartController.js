const cartServices = require('../services/cartServices.js');
const productServices = require('../services/productServices.js');

async function renderShoppingCart(req,res){
    var token = req.cookies.user.token;
    await matchProductIds(token).then(data => {
        res.render('shoppingCart',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: req.womenNavbar[0],
            subcategories: req.womenNavbar[1],
            user : req.cookies.user.user,
            cartItems : data,
            message: req.flash('message')
        });
    }).catch(err=>{
        console.log(err);
        res.render("error",err.error);
    });
}

function addToCart(req,res,next){
    var token = req.cookies.user.token;
    addToCartData = {
        token : token,
        quantity : req.body.quantity,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    cartServices.addToCart(addToCartData).then( (data) => {
        req.flash('message', 'Item added to the shopping cart');
        res.redirect('back');
    }).catch(err=>{
        next(err);
    });
}

async function matchProductIds(token){
    const cartItems = await cartServices.getCart(token).then(data => data);
    if(cartItems.error === 'There is no cart created for this user'){
        return null;
    }else{
        const promises = cartItems.items.map(async cartItem => {
            const tempProduct = await productServices.getProductById(cartItem.productId);
            const tempImage = tempProduct[0].image_groups.filter(images => images.view_type == 'large' && images.variation_value == cartItem.variant.variation_values.color)[0].images;
            const tempProductVariations = [];

            const variationKeys = Object.keys(cartItem.variant.variation_values);   // variation keys holds values like color size etc
            variationKeys.forEach((variationAttribute,index) => { // iterate through values like color : JJXX02J  or size : 106 ------------- variation attribute is color size etc
                let tempVariation = tempProduct[0].variation_attributes.filter(var_attr => var_attr.id == variationAttribute); // choose color or size or width ----- iterate through a products variation attributes to match names with values
                let result =  tempVariation[0].values.filter(value => value.value == cartItem.variant.variation_values[variationAttribute])[0].name; // get the value of the variation yellow green or 160 etc
                tempProductVariations.push({
                    "variation_name" :  tempVariation[0].name,
                    "variation_value" : result
                })
            });
            
            const modifiedProduct = {
                "product" : tempProduct,
                "variation" : cartItem.variant,
                "images" : tempImage,
                "variationValues" : tempProductVariations,
                "quantity" : cartItem.quantity
            };
            
            return modifiedProduct;
        });

        const endProducts = await Promise.all(promises);
        return endProducts;
    }
}

function removeFromCart(req,res,next){
    var token = req.cookies.user.token;
    var removeFromCartData = {
        token : token,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    cartServices.removeFromCart(removeFromCartData).then((data) => {
        req.flash('message', 'Item removed from the shopping cart');
    })
    .then(() => {
        res.redirect('back');
    })
    .catch(err=>{
        next(err);
    });
}

module.exports = {
    renderShoppingCart,
    addToCart,
    removeFromCart
}