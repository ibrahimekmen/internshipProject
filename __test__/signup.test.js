const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const authenticationController = require('../controllers/authenticationController');
const randomstring = require("randomstring");

function randomString(length){
    return randomstring.generate({ length: length, charset: 'alphabetic'});
}

describe('SignUp testing', () => {
    test('it redirects with error if the user already exists', async () => {
        const req = mockRequest({
            body: {
                name : "123",
                email: "123" + '@gmail.com',
                password: 123,
                confirmPassword: 123,
            }
        });
        const res = mockResponse();
        const next = mockNext();
        await authenticationController.signUp(req, res, next);
        const { redirect } = res;
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('back'));
    });

    test('it redirects with redirect querystring if sign up parameters are filled correctly', async () => {
        const password = randomString(20);
        const req = mockRequest({
            body: {
                email: randomString(15) + '@gmail.com',
                password: password,
                confirmPassword: password
            }
        });
        const res = mockResponse();
        await authenticationController.signUp(req, res);
        const { redirect } = res;
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('back'));
    });      
});