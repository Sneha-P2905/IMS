import React, { useEffect, useState } from "react";

function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <div>
      <h2>Inventory Page</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category</th>
            <th>Region</th>
            <th>Price</th>
            <th>Inventory Level</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product["Product ID"]}>
              <td>{product["Product ID"]}</td>
              <td>{product.Category}</td>
              <td>{product.Region}</td>
              <td>{product.Price}</td>
              <td>{product["Inventory Level"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryPage;
