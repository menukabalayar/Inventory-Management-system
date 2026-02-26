// tests/registerController.test.js
import request from "supertest";
import express from "express";
// in registerController.test.js
import { register } from "../src/controller/registerController.js";
import { User } from "../models/userModel.js";

// Mock the User model
jest.mock("../models/userModel.js");

const app = express();
app.use(express.json());
app.post("/register", register);

describe("Register Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user named Menuka and return user data", async () => {
    // Mock the User.create method
    User.create.mockResolvedValue({
      id: 1,
      name: "Menuka",
      email: "menuka@example.com",
    });

    const res = await request(app)
      .post("/register")
      .send({
        name: "Menuka",
        email: "menuka@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Menuka",
      email: "menuka@example.com",
    });
    expect(User.create).toHaveBeenCalledWith({
      name: "Menuka",
      email: "menuka@example.com",
      password: "password123",
    });
  });

  it("should return 500 if User.create throws an error", async () => {
    User.create.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/register")
      .send({
        name: "Menuka",
        email: "menuka@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Database error" });
  });
});