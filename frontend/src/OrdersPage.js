import React, { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [store, setStore] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fixedStoreIDs = ["S001", "S002", "S003", "S004", "S005"];

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  const placeOrder = async () => {
    if (!customer || !store || !product || quantity <= 0) {
      alert("⚠️ Please enter valid order details.");
      return;
    }

    const selectedProduct = products.find(
      (p) => p["Product ID"] === product && p["Store ID"] === store
    );

    if (!selectedProduct) {
      alert("⚠️ Product not available in this store.");
      return;
    }

    if (selectedProduct["Inventory Level"] < quantity) {
      alert("⚠️ Not enough stock available!");
      return;
    }

    const orderData = {
      customer,
      product,
      store,
      quantity,
      total: selectedProduct.Price * quantity,
      status: "Pending",
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);

      await axios.put(
        `http://localhost:5000/api/products/update-stock/${product}/${store}`,
        { quantity }
      );

      alert("✅ Order placed successfully!");
      fetchOrders();
      fetchProducts();
      setCustomer("");
      setProduct("");
      setStore("");
      setQuantity(1);
    } catch (error) {
      console.error("❌ Error placing order:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Orders</h2>

      <div style={styles.orderForm}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          style={styles.input}
        />

        <select
          value={store}
          onChange={(e) => {
            setStore(e.target.value);
            setProduct(""); // Reset product when store changes
          }}
          style={styles.input}
        >
          <option value="">Select Store</option>
          {fixedStoreIDs.map((storeID) => (
            <option key={storeID} value={storeID}>
              {storeID}
            </option>
          ))}
        </select>

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={styles.input}
          disabled={!store}
        >
          <option value="">Select Product</option>
          {products
            .filter((p) => p["Store ID"] === store)
            .map((p, idx) => (
              <option key={idx} value={p["Product ID"]}>
                {p["Product ID"]} - {p.Category} ({p["Inventory Level"]} in stock)
              </option>
            ))}
        </select>

        {product && store && (
          <div style={{ fontSize: "14px", color: "#555" }}>
            {(() => {
              const selected = products.find(
                (p) =>
                  p["Product ID"] === product && p["Store ID"] === store
              );
              return selected ? (
                <>
                  💰 Price: ₹{selected.Price} &nbsp;|&nbsp; 🏷️ Category: {selected.Category}
                </>
              ) : null;
            })()}
          </div>
        )}

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={styles.input}
        />

        <button onClick={placeOrder} style={styles.button}>
          🛒 Place Order
        </button>
      </div>

      <h3 style={styles.subHeading}>📝 Existing Orders</h3>
      <ul style={styles.ordersList}>
        {orders.map((order, index) => (
          <li key={index} style={styles.orderItem}>
            <span style={styles.customerName}>{order.customer}</span> ordered{" "}
            <span style={styles.orderDetails}>
              {order.quantity} x {order.product}
            </span>{" "}
            from Store {order.store}{" "}
            <span style={styles.status}>{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#2c3e50",
    textAlign: "center",
  },
  subHeading: {
    color: "#34495e",
    textAlign: "center",
  },
  orderForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    border: "1px solid #bdc3c7",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#2980b9",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  ordersList: {
    listStyle: "none",
    padding: "0",
  },
  orderItem: {
    background: "white",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "6px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  customerName: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  orderDetails: {
    color: "#27ae60",
  },
  status: {
    fontWeight: "bold",
    color: "#e67e22",
  },
};

export default OrdersPage;
