const mongoose = require("mongoose"); 
const Inventory = require("./inventory"); // Import the Inventory model

const orderSchema = new mongoose.Schema({
    customer: String,
    product: String,  // This should match "Product ID" in Inventory
    quantity: Number,
    total: Number,
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Refunded"],
        default: "Pending",
    },
});

// ✅ Middleware: Reduce stock from inventory when an order is placed
orderSchema.pre("save", async function (next) {
    try {
        // Find the product in Inventory
        const inventoryItem = await Inventory.findOne({ "Product ID": this.product });

        if (!inventoryItem) {
            throw new Error("Product not found in inventory");
        }

        // Check if stock is available
        if (inventoryItem["Stock Quantity"] < this.quantity) {
            throw new Error("Not enough stock available!");
        }

        // Deduct stock
        inventoryItem["Stock Quantity"] -= this.quantity;
        await inventoryItem.save();  // Update inventory in the database

        next(); // Proceed with saving the order
    } catch (error) {
        next(error); // Pass error to the save operation
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;