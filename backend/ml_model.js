const runMLModel = async () => {
    console.log("🔍 Running ML Model...");
    
    // ✅ Example of fetching data from MongoDB (modify as per your ML logic)
    const mongoose = require("mongoose");
    const Inventory = require("./models/inventory");

    try {
        // Fetch inventory data
        const products = await Inventory.find({});
        console.log("📊 Data fetched for ML model:", products.length, "records.");

        // 🧠 Simulating ML Model Execution
        const predictions = products.map(product => ({
            "Product ID": product["Product ID"],
            prediction: Math.random() < 0.5 ? "Understocked" : "Overstocked"  // Mock logic
        }));

        console.log("✅ ML Model Predictions:", predictions);
        return predictions;
    } catch (error) {
        console.error("❌ Error running ML Model:", error);
    }
};

module.exports = { runMLModel };
