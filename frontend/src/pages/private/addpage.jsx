import React, { useState } from "react";
import axios from "axios";
import "./addpage.css";

const AddInventory = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    status: "Available",
    categoryId: "",
    supplierId: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/inventory/add", data);
      alert("Product added successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="productName" placeholder="Product Name" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="supplier" placeholder="Supplier" onChange={handleChange} />
      <input name="categoryId" type="number" placeholder="Category ID" onChange={handleChange} />
      <input name="supplierId" type="number" placeholder="Supplier ID" onChange={handleChange} />

      <select name="status" onChange={handleChange}>
        <option value="Available">Available</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddInventory;