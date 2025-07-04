const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://Nandikka:Nandikka27@cluster0.xpgqfv6.mongodb.net/inventorydb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define Product Schema & Model
const productSchema = new mongoose.Schema({
  Date: String,
  "Store ID": String,
  "Product ID": String,
  Category: String,
  Region: String,
  "Inventory Level": Number,
  "Units Sold": Number,
  "Units Ordered": Number,
  "Demand Forecast": Number,
  Price: Number,
  Discount: Number,
  "Weather Condition": String,
  "Holiday/Promotion": Number,
  "Competitor Pricing": Number,
  Seasonality: String
});
const Product = mongoose.model("Product", productSchema);

// ✅ Define Inventory Schema & Model
const inventorySchema = new mongoose.Schema({
  "Product ID": String,
  "Store ID": String,
  Category: String,
  Region: String,
  "Stock Quantity": Number,
  Price: Number
});
const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");

// ✅ Define Order Schema & Model
const orderSchema = new mongoose.Schema({
  customer: String,
  product: String,
  quantity: Number,
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Refunded"],
    default: "Pending",
  },
});
const Order = mongoose.model("Order", orderSchema);

// ✅ ML Result Schema (Flexible for any shape)
const mlResultSchema = new mongoose.Schema({}, { strict: false });
const MLResult = mongoose.model("ml_results", mlResultSchema);

// ================== API Routes ==================

// 📦 Add Product + Inventory
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    const newInventory = new Inventory({
      "Product ID": req.body["Product ID"],
      "Store ID": req.body["Store ID"],
      Category: req.body.Category,
      Region: req.body.Region,
      "Stock Quantity": req.body["Inventory Level"],
      Price: req.body.Price
    });
    await newInventory.save();

    res.status(201).json({ message: "✅ Product and inventory added successfully!" });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// 📦 Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 📦 Get Products by Store ID
app.get("/api/products/by-store/:storeId", async (req, res) => {
  try {
    const products = await Product.find({ "Store ID": req.params.storeId });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products by store:", err);
    res.status(500).json({ error: "Failed to fetch products by store" });
  }
});

// 📦 Get Inventory
app.get("/api/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    console.error("❌ Error fetching inventory:", err);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

// 📦 Place Order + Update Inventory
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, product, quantity, total, status } = req.body;
    const inventoryItem = await Inventory.findOne({ "Product ID": product });

    if (!inventoryItem) {
      return res.status(404).json({ error: "Product not found in inventory" });
    }

    if (inventoryItem["Stock Quantity"] < quantity) {
      return res.status(400).json({ error: "Not enough stock available!" });
    }

    inventoryItem["Stock Quantity"] -= quantity;
    await inventoryItem.save();

    const newOrder = new Order({ customer, product, quantity, total, status: status || "Pending" });
    await newOrder.save();

    res.status(201).json({ message: "✅ Order placed successfully!", order: newOrder });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// 📦 Get All Orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// 📦 Delete Order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "✅ Order deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

// 📦 Update Order Status
app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "✅ Order updated successfully!", order: updatedOrder });
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// 📦 Get Latest ML Result (Raw)
app.get("/api/ml-results/latest", async (req, res) => {
  try {
    const latest = await MLResult.findOne().sort({ timestamp: -1 });
    res.json(latest);
  } catch (err) {
    console.error("❌ Error fetching ML results:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📦 Get ML Result Summary
app.get("/api/ml-results/latest/summary", async (req, res) => {
  try {
    const result = await MLResult.findOne().sort({ timestamp: -1 });

    if (!result) return res.status(404).json({ message: "No ML result found." });

    const out = Array.isArray(result.out_of_stock) ? result.out_of_stock : [];
    const near = Array.isArray(result.near_out_of_stock) ? result.near_out_of_stock : [];
    const over = Array.isArray(result.overstocked) ? result.overstocked : [];

    res.json({
      timestamp: result.timestamp,
      accuracy: result.accuracy || 0,
      totalCounts: {
        out_of_stock: out.length,
        near_out_of_stock: near.length,
        overstocked: over.length
      },
      samples: {
        out_of_stock: out.slice(0, 30),
        near_out_of_stock: near.slice(0, 30),
        overstocked: over.slice(0, 30)
      }
    });
  } catch (err) {
    console.error("❌ Error fetching ML summary:", err);
    res.status(500).json({ message: "Error fetching ML summary" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
