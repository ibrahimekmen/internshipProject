const fetch = require('node-fetch');
require('dotenv').config()

async function createNewUser(userData){
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(userData)
    });
    return response.json();
}

async function logIn(userData){
    const response = await fetch(`${process.env.API_URL}/auth/signin`, {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(userData) 
    });
    return response.json();
}

module.exports = {
    logIn,
    createNewUser
}