import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/inventory") // Fetch inventory data
          .then((res) => res.json())
          .then((data) => setInventory(data))
          .catch((err) => console.error("❌ Error fetching inventory:", err));
      }, []);

    return (
        <div>
            <h2>📦 Inventory</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product["Product ID"]}</td>
                                <td>{product.Category}</td>
                                <td>${product.Price}</td>
                                <td>{product["Inventory Level"]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">⚠️ No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
