// test/userController.test.js
import { jest } from "@jest/globals";
import SequelizeMock from "sequelize-mock";
import { getUser, updateUser } from "../src/controller/userController.js";

// ===============================
// MOCK DATABASE & MODEL
// ===============================
const dbMock = new SequelizeMock();
const UserMock = dbMock.define("User", {
  id: 1,
  name: "Menuka Rai",
  username: "menuka01",
  email: "menuka@gmail.com",
  password: "12345",
  profile_image: null,
});

// ===============================
// IMPORT CONTROLLER AFTER MOCK
// ===============================
import * as userController from "../controller/userController.js";

// ===============================
// HELPER: MOCK RESPONSE
// ===============================
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// ===============================
// TEST SUITE
// ===============================
describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // ===============================
  // GET USER BY ID
  // ===============================
  it("should fetch user by id", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    // Override User model in controller
    userController.getById.prototype.User = UserMock;

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.any(Object),
        message: "User fetched successfully",
      })
    );
  });

  it("should return 404 if user not found", async () => {
    const req = { params: { id: 99 } };
    const res = mockResponse();

    // Return null to simulate not found
    UserMock.findOne.mockResolvedValue(null);

    userController.getById.prototype.User = UserMock;

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  // ===============================
  // UPDATE USER
  // ===============================
  it("should update username", async () => {
    const req = { params: { id: 1 }, body: { username: "newname" } };
    const res = mockResponse();

    const mockUser = { id: 1, username: "oldname", save: jest.fn() };

    UserMock.findOne.mockResolvedValue(mockUser);
    userController.updateById.prototype.User = UserMock;

    await userController.updateById(req, res);

    expect(mockUser.username).toBe("newname");
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 404 if user not found for update", async () => {
    const req = { params: { id: 10 }, body: { username: "newname" } };
    const res = mockResponse();

    UserMock.findOne.mockResolvedValue(null);
    userController.updateById.prototype.User = UserMock;

    await userController.updateById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  // ===============================
  // DELETE USER
  // ===============================
  it("should delete user", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const mockUser = { destroy: jest.fn() };
    UserMock.findOne.mockResolvedValue(mockUser);
    userController.deleteById.prototype.User = UserMock;

    await userController.deleteById(req, res);

    expect(mockUser.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 404 if user not found for delete", async () => {
    const req = { params: { id: 10 } };
    const res = mockResponse();

    UserMock.findOne.mockResolvedValue(null);
    userController.deleteById.prototype.User = UserMock;

    await userController.deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});