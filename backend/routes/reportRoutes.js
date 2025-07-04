const express = require("express");
const Sales = require("../models/Sales");
const router = express.Router();

router.get("/sales", async (req, res) => {
  try {
    const salesData = await Sales.find();
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

module.exports = router;
