import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
        .then(response => {
            console.log("Fetched Products:", response.data); // Log data
            setProducts(response.data);
        })
        .catch(error => console.error("Error fetching products:", error));
}, []);


  return (
    <div className="container">
      <h2>Inventory Products</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category</th>
            <th>Region</th>
            <th>Inventory Level</th>
            <th>Units Sold</th>
            <th>Price</th>
            <th>Seasonality</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product["Product ID"]}</td>
              <td>{product.Category}</td>
              <td>{product.Region}</td>
              <td>{product["Inventory Level"]}</td>
              <td>{product["Units Sold"]}</td>
              <td>{product.Price}</td>
              <td>{product.Seasonality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
