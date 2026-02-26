import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();
const InventoryMock = dbMock.define("Inventory", {
  id: 1,
  name: "Laptop",
  quantity: 10,
  price: 1200,
  category: "Electronics",
  status: "available",
});

describe("Inventory Mock Model", () => {
  it("should create inventory item", async () => {
    const item = await InventoryMock.create({
      name: "Laptop",
      quantity: 10,
      price: 1200,
      category: "Electronics",
    });

    expect(item.name).toBe("Laptop");
    expect(item.quantity).toBe(10);
    expect(item.price).toBe(1200);
    expect(item.category).toBe("Electronics");
    expect(item.status).toBe("available");
  });
});