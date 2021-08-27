const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;
const app = require("../app.js");
chai.use(require('chai-json'))
chai.use(require('chai-as-promised'));
chai.use(require("chai-http"));
const request = require('supertest');



// describe('Men and Women controller checks', () => {    
//     it('Response should be ', async () =>{
//         const signUpResponse = await authenticationServices.createNewUser(userData);
//         expect(signUpResponse).to.be.a.jsonObj();
//         const signUpResponseKeys = Object.keys(signUpResponse);
//         if(signUpResponseKeys.includes('error')){
//             assert.isTrue(
//                 signUpResponse["error"] === "User already exists",
//                 'User already exists'
//             );
//         }else{
//             expect(signUpResponse).to.have.keys(['user','token']);
//         }
//     });
// });
