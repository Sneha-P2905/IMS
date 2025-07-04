const mongoose = require("mongoose");

const MLResultSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  out_of_stock: {
    type: [mongoose.Schema.Types.Mixed], // could be string, object, etc.
    default: [],
  },
  near_out_of_stock: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  overstocked: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

module.exports = mongoose.model("MLResult", MLResultSchema);
