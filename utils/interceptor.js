module.exports = {
    mockRequest: () => {
      const req = {}
      req.body = jest.fn().mockReturnValue(req)
      req.params = jest.fn().mockReturnValue(req)
      req.redirect = jest.fn().mockReturnValue(req)
      req.cookies = jest.fn().mockReturnValue(req);
      req.womenNavbar = jest.fn().mockReturnValue(req);
      req.menNavbar = jest.fn().mockReturnValue(req);
      req.flash = jest.fn().mockReturnValue(req);
      return req
    },
  
    mockResponse: () => {
      const res = {}
      res.send = jest.fn().mockReturnValue(res)
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)
      res.cookie = jest.fn().mockReturnValue(res);
      res.redirect = jest.fn().mockReturnValue(res);
      res.render = jest.fn().mockReturnValue(res);
      return res
    },
    mockNext: () => jest.fn(),
    resetMocks: true,
  }