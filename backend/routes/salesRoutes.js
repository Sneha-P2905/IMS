const express = require("express");
const Sales = require("../models/Sales"); // Ensure this path is correct
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data" });
  }
});

module.exports = router;
