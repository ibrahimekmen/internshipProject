const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
//const { getMockReq, getMockRes } = require('@jest-mock/express');
const authenticationController = require('../controllers/authenticationController');
const randomstring = require("randomstring");

function randomString(length){
    return randomstring.generate({ length: length, charset: 'alphabetic'});
}

describe('SignUp testing', () => {
    test('it redirects with error if the user already exists', async () => {
        const password = randomString(20);
        const req = mockRequest({
            body: {
                email: randomString(15) + '@gmail.com',
                password: password,
                confirmPassword: password,
            },
            redirect: 'back'
        });
        const res = mockResponse();
        await authenticationController.signUp(req, res);
        const { redirect } = res;
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
    });

    test('it redirects with redirect querystring if req.body had it', async () => {
        const password = randomString(20);
        const req = mockRequest({
            body: {
                email: randomString(15) + '@gmail.com',
                password: password,
                confirmPassword: password
            },
            redirect: 'back'
        });
        const res = mockResponse();
        await authenticationController.signUp(req, res);
        const { redirect } = res;
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
        expect(redirect).toBeCalledWith(expect.stringContaining('redirect'));
    });

    test('it writes cookies and redirects with no error if the user exists', async () => {
        const req = mockRequest({
            body: {
                email: '123@gmail.com',
                password: '123',
                confirmPassword: '123'
            },
            redirect: 'back'
        });
        const res = mockResponse();
        await authenticationController.signUp(req, res);
        const { redirect, cookie } = res;
        expect(cookie).not.toHaveBeenCalledTimes(0);
        expect(cookie).toBeCalledWith(
            expect.any(String),
            expect.any(String),
            expect.any(Object)
        );
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.not.stringContaining('error'));
    });
});