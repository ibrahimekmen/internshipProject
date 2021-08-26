const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-json'))
chai.use(require('chai-as-promised'));
chai.use(require("chai-http"));

const authenticationServices = require('../services/authenticationServices');

describe('Sign Up Service', () => {
    const userData = {
        name : 'ibrahim',
        email : 'ibrahi123131231@gmail.com',
        password : 12344321,
        secretKey: `${process.env.SECRET_KEY}`
    };
    
    it('User sign up must have user and token keys or error key indicating that the user has already signed up', () =>{
        expect(Promise.resolve(authenticationServices.createNewUser(userData))).to.eventually.be.a.jsonObj();
        expect(Promise.resolve(authenticationServices.createNewUser(userData))).to.eventually.have.keys([
            "user",
            "token"
        ]);
    });
});

describe('Log In Service', () => {
    const userData = {
        email : 'ibrahi123131231@gmail.com',
        password : 1344321,
        secretKey: `${process.env.SECRET_KEY}`
    };
    
    it('User login must ', () =>{
        authenticationServices.logIn("yo").then(data =>{
            expect(data).to.be.false;
        });
    });
});

