const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    "Product ID": { type: String, required: true },
    "Store ID": { type: String, required: true },
    Category: String,
    Region: String,
    "Stock Quantity": { type: Number, default: 0 },
    Price: Number
});

const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");
module.exports = Inventory;
