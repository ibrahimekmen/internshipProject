const { mockRequest, mockResponse, mockNext } = require('../utils/interceptor');
const genderController = require('../controllers/genderController');

describe('Gender specific pages', () => {
    test('res renders men page when the input is -men-', async () => {
        const req = mockRequest(); 
        const res = mockResponse();
        await genderController.renderMain(req, res, "Men");
        const render = await res.render;
        await expect(render).toHaveBeenCalledTimes(1);
        await expect(render).toHaveBeenCalledWith('index',expect.anything());
    });

    test('res renders women page when the input is -women-', async () => {
        const req = mockRequest(); 
        const res = mockResponse();
        await genderController.renderMain(req, res, "Women");
        const render = await res.render;
        await expect(render).toHaveBeenCalledTimes(1);
        await expect(render).toHaveBeenCalledWith('index',expect.anything());
    });


    test('res renders men subcategory pages when the input is -men-', async () => {
        const req = mockRequest({
            params: {
                category: "/men/mens-clothing-dress-shirts"
            }
        }); 
        const res = mockResponse();
        await genderController.renderSubcategories(req, res, "Men");
        const render = await res.render;
        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toHaveBeenCalledWith('subcategory',expect.anything());
    });
    // test('res renders men subcategory page', async () =>{
    //     const req = mockRequest(); 
    //     const res = mockResponse();
    //     await genderController.renderSubcategories(req, res, "Women");
    //     const render = await res.render;
    //     await expect(render).toHaveBeenCalledTimes(1);
    //     await expect(render).toHaveBeenCalledWith('subcategory',expect.anything());
    // });
});

