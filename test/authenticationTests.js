const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;
const app = require("../app.js");
chai.use(require('chai-json'))
chai.use(require('chai-as-promised'));
chai.use(require("chai-http"));
const request = require('supertest');

const authenticationServices = require('../services/authenticationServices');

describe('Sign Up Service', () => {
    const userData = {
        name : 'ibrahim',
        email : 'ibrahi123131231@gmail.com',
        password : 12344321,
        secretKey: `${process.env.SECRET_KEY}`
    };
    
    it('User sign up must have user and token keys or error key indicating that the user has already signed up', async () =>{
        const signUpResponse = await authenticationServices.createNewUser(userData);
        expect(signUpResponse).to.be.a.jsonObj();
        const signUpResponseKeys = Object.keys(signUpResponse);
        if(signUpResponseKeys.includes('error')){
            assert.isTrue(
                signUpResponse["error"] === "User already exists",
                'User already exists'
            );
        }else{
            expect(signUpResponse).to.have.keys(['user','token']);
        }
    });
});

describe("Sign In Service", () => {
    it("Success if credentials are valid", async () => {
        chai
        .request(app)
        .post('/login')
        .type('form')
        .send({email : '123@gmail.com', password: '123'})
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.an('object');
        })
        .catch(error =>{
            throw error;
        });
    });
});
  