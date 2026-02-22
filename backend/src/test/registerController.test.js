const registerController = require('../controller/registerController');
const user = require("../model/userModel");

jest.mock("../model/userModel" , () => ({ 
    create: jest.fn(),

}));

describe("Register Controller", () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    it ("should create a new user", async () => {
        const req = {body:{
            Name: "Anshu",
            Address: "Kathmandu",
            Email: "anshu@example.com",
            Password: "anshu123",
            phone: "9845678901",
            gender: "female",
        }
    };
        const res = mockResponse();
        user.create.mockResolvedValue(req.body);

        await registerController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ id: 1, }]))
    });
    
});
