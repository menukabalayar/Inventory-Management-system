import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import axios from "axios";

export default function MainPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Inventory Data
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/inventory"
        );
        setInventories(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventories:", error);
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  // 🔥 Table Columns
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`http://localhost:5000/uploads/${row.image}`}
          alt="product"
          width="50"
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Price",
      selector: (row) => `Rs. ${row.price}`,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Welcome {user?.name}</h2>

        <DataTable
          title="Inventory List"
          columns={columns}
          data={inventories}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </>
  );
}