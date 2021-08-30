const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const homeController = require('../controllers/homeController');

describe('Rendering homepage', () => {
    test('res renders the home.pug', async () => {
        const req = mockRequest(); 
        const res = mockResponse();
        await homeController.render(req, res);
        const { render } = res;
        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toHaveBeenCalledWith('home',expect.anything());
    });
});