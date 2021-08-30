const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const cartController = require('../controllers/shoppingCartController');

describe('Shopping Cart', () => {
    test('res renders the  shopping cart', async () => {
        const req = mockRequest(); 
        const res = mockResponse();
        await cartController.renderShoppingCart(req, res);
        const render  = await res.render;
        await expect(render).toHaveBeenCalledTimes(1);
        await expect(render).toHaveBeenCalledWith('shoppingCart',expect.anything());
    });
});