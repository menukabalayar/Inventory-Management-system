import React, { useState } from "react";
import axios from "axios";
import "./addpage.css";

const AddInventory = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: 0,
    price: "",
    supplier: "",
    status: "Available"
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/inventory/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res.data);
      alert("Product Added Successfully!");
      setFormData({ productName: "", category: "", quantity: 0, price: "", supplier: "", status: "Available" });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add product!");
    }
  };

  return (
    <div className="add-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-form" encType="multipart/form-data">
        <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddInventory;