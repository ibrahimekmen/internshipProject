const fetch = require('node-fetch');
require('dotenv').config()

async function getWomenNavbar(){
    let response = await fetch(`${process.env.API_URL}/categories/parent/womens?secretKey=${process.env.SECRET_KEY}`);
    let categoryData = await response.json();

    let subcategories = [];

    for (element of categoryData) {
        const sub = await getSubCategories(element.id);
        subcategories.push(sub);
    }

    return [categoryData,subcategories];
}

async function getSubCategories(category){
    let response = await fetch(`${process.env.API_URL}/categories/parent/${category}?secretKey=${process.env.SECRET_KEY}`);
    let data = await response.json();
    return data;
}

async function getMenNavbar(){
    let response = await fetch(`${process.env.API_URL}/categories/parent/mens?secretKey=${process.env.SECRET_KEY}`).catch();
    let categoryData = await response.json();

    let subcategories = [];

    for (element of categoryData) {
        const sub = await getSubCategories(element.id);
        subcategories.push(sub);
    }
    
    return [categoryData,subcategories];
}

module.exports = {
    getMenNavbar,
    getWomenNavbar
}
