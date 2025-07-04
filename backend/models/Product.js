const mongoose = require('mongoose');

// ✅ Import the Product model
const Product = mongoose.model("Product", new mongoose.Schema({
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
}));
