const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const productPageController = require('../controllers/productPageController');

describe('PDP', () => {
    test('res renders the pdp', async () => {
        const req = mockRequest({
            params: {
                productName: "Modern Striped Dress Shirt"
            }
        }); 
        const res = mockResponse();
        await productPageController.render(req, res,'Men');
        const { render } = res;
        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toHaveBeenCalledWith('product',expect.anything());
    });
});