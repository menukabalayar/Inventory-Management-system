Inventory.belongsTo(Category, { foreignKey: "categoryId" });
Inventory.belongsTo(Supplier, { foreignKey: "supplierId" });

Category.hasMany(Inventory, { foreignKey: "categoryId" });
Supplier.hasMany(Inventory, { foreignKey: "supplierId" });