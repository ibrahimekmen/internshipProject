const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const profileController = require('../controllers/profilePageController');

describe('Profile page', () => {
    test('If no userId(not logged in) creates an error and sends it to the error handling middleware', async () => {
        const req = mockRequest(); 
        const res = mockResponse();
        const next = mockNext();
        await profileController.profilePage(req, res, next);
        await expect(next).toHaveBeenCalledTimes(1);
        await expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});