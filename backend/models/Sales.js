const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    month: { type: String, required: true },
    sales: { type: Number, required: true }
});

module.exports = mongoose.model("Sales", SalesSchema);
