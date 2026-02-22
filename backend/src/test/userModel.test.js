const sequelizeMock = require('sequelize-mock');
const dbMock = new sequelizeMock();

const UserMock = dbMock.define('User', {
    id:1,
    Name: "Anshu",
    Email: "anshu@example.com",
    Password: "menuka123",
    Adress: "Kathmandu",
    phone: "9845678901",
    gender: "female",
});

describe("User Model", () => {
    it("should create a user ",async() => {
        const user = await UserMock.create({
            Name: "Anshu",
            Email: "anshu@example.com",
            Password: "anshu123",
            Adress: "Kathmandu",
            phone: "9845678901",
            gender: "female",
        });
        expect(user.Name).toBe("Anshu");
        expect(user.Email).toBe("anshu@example.com");
        expect(user.Password).toBe("anshu123");
        expect(user.Adress).toBe("Kathmandu");
        expect(user.phone).toBe("9845678901");
        expect(user .gender).toBe("female");
    });
    it("should require all fields", async () => {
        await expect(UserMock.create({})).rejects.toThrow();
    });
});



       

        
