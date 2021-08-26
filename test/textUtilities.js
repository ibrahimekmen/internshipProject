const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-json'))
chai.use(require('chai-as-promised'));
chai.use(require("chai-http"));


// Sanity check
describe('Mocha', () => {
    it('should run test using npm', () => {
        expect(true).to.be.ok;
    });
});