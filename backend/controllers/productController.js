const Product = require("../models/Product");

exports.getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lt: 5 } }); // Stock below 5 is considered low
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};
