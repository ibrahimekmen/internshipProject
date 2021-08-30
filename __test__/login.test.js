const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const authenticationController = require('../controllers/authenticationController');
const randomstring = require("randomstring");

function randomString(length){
    return randomstring.generate({ length: length, charset: 'alphabetic'});
}

describe('SignIn testing', () => {
    test('it writes cookies and redirects with no error if the user exists', async () => {
        const req = mockRequest({
            body: {
                email: '123@gmail.com',
                password: '123',
                redirect: 'back'
            },
            cookies:{
                userId: "123"
            }
        });
        const res = mockResponse();
        const next = mockNext();
        await authenticationController.login(req, res, next);
        const { redirect, cookie } = res;
        expect(cookie).toHaveBeenCalledTimes(0);
        expect(cookie).toBeCalledWith(
            expect.any(String),
            expect.any(String)
        );
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.not.stringContaining('error'));
    });
      
});