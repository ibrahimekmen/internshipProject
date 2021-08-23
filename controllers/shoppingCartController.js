const cartServices = require('../services/cartServices.js');
const productServices = require('../services/productServices.js');

function renderShoppingCart(req,res){
    var token = req.session.user.token;
    matchProductIds(token).then(data => {
        res.render('shoppingCart',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: req.womenNavbar[0],
            subcategories: req.womenNavbar[1],
            user : req.session.user.user,
            cartData : data
        });
    }).catch(err=>{
        console.log(err);
        res.render("error",err.error);
    });
}

function addToCart(req,res,next){
    var token = req.session.user.token;
    addToCartData = {
        token : token,
        quantity : req.body.quantity,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    cartServices.addToCart(addToCartData).then( () => {
        res.redirect('back');
    }).catch(err=>{
        next(err);
    });
}


async function matchProductIds(token){
    const cartItems = await cartServices.getCart(token).then(data => data);
    const allProducts = [];
    cartItems.items.forEach(cartItem => {
        let tempProduct =  productServices.getProductById(cartItem.productId).then(data => data);
        allProducts.push({
            "product" : tempProduct,
            "variation" : cartItem.varaint
        });
    });
    return allProducts;
}

module.exports = {
    renderShoppingCart,
    addToCart
}