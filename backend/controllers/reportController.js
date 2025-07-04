const Sales = require("../models/Sales");

exports.getSalesReport = async (req, res) => {
    try {
        const salesData = await Sales.find();
        res.json(salesData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sales data" });
    }
};

// Simple AI-based prediction (Moving Average)
exports.getSalesForecast = async (req, res) => {
    try {
        const salesData = await Sales.find();
        let totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);
        let avgSales = totalSales / salesData.length;
        res.json({ forecastedSales: avgSales * 1.1 }); // Predict 10% growth
    } catch (error) {
        res.status(500).json({ message: "Error forecasting sales" });
    }
};
