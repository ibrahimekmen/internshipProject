const fetch = require('node-fetch');

async function getWishlist(data){
    const response = await fetch(`${process.env.API_URL}/wishlist?secretKey=${process.env.SECRET_KEY}`,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data}`
        },
        authentication : {
            'token' : data,
            'type' : 'bearer' 
        }
    });
    return response.json();
}

async function addToWishlist(data){
    const bodyData = {
        "secretKey" : `${process.env.SECRET_KEY}`,
        "productId" : data.productId,
        "variantId" : data.variationId,
        "quantity" : data.quantity, 
    };

    const response = await fetch(`${process.env.API_URL}/wishlist/addItem`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data.token}`
        },
        authentication : {
            'token' : data.token,
            'type' : 'bearer' 
        },
        body : JSON.stringify(bodyData)
    }).catch(error =>{
        console.error(error);
    });
    return await response.json();
}

async function removeFromWishlist(data){
    const bodyData = {
        "secretKey" : `${process.env.SECRET_KEY}`,
        "productId" : data.productId,
        "variantId" : data.variationId
    };

    const response = await fetch(`${process.env.API_URL}/wishlist/removeItem`,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data.token}`
        },
        authentication : {
            'token' : data.token,
            'type' : 'bearer'
        },
        body : JSON.stringify(bodyData)
    }).catch(error =>{
        console.error(error);
    });
    return await response;
}

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
}