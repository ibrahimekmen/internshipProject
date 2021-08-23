const fetch = require('node-fetch');

async function getProductById(productId){
    const response = await fetch(`${process.env.API_URL}/products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`);
    return await response.json();
}

async function getProductsByCategory(category){
    let response = await fetch(`${process.env.API_URL}/products/product_search?primary_category_id=${category}&secretKey=${process.env.SECRET_KEY}`);
    let data = await response.json();
    return data;
}

async function getProductByName(name){
    const response = await fetch(`${process.env.API_URL}/products/product_search?name=${name}&secretKey=${process.env.SECRET_KEY}`);
    const data = await response.json();
    return await data;
}

async function getSubCategories(category){
    let response = await fetch(`${process.env.API_URL}/categories/parent/${category}?secretKey=${process.env.SECRET_KEY}`);
    let data = await response.json();
    return data;
}

module.exports = {
    getProductById,
    getProductsByCategory,
    getProductByName,
    getSubCategories
}