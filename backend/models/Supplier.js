const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String }
});

module.exports = mongoose.model("Supplier", SupplierSchema);
