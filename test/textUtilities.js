const expect = require('chai').expect;
expect.use(require('chai-json'));


const userData = {
    name : 'ibrahim',
    email : 'ibrahimyo@gmail.com',
    password : 12344321,
    secretKey: `${process.env.SECRET_KEY}`
};

expect(createNewUser(userData)).to.be.a.jsonFile();