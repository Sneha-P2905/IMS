import { useState } from "react";
import axios from "axios";

const AddProductPage = () => {
  const initialState = {
    Date: "",
    "Store ID": "",
    "Product ID": "",
    Category: "",
    Region: "",
    "Inventory Level": "",
    "Units Sold": "",
    "Units Ordered": "",
    "Demand Forecast": "",
    Price: "",
    Discount: "",
    "Weather Condition": "",
    "Holiday/Promotion": "",
    "Competitor Pricing": "",
    Seasonality: "",
  };

  const productIDs = [
    "P0001", "P0002", "P0003", "P0004", "P0005", "P0006",
    "P0007", "P0008", "P0009", "P0010", "P0011", "P0012",
    "P0013", "P0014", "P0015", "P0016", "P0017", "P0018",
    "P0019", "P0020"
  ];

  const storeIDs = ["S001", "S002", "S003", "S004", "S005"];

  const regions = [
    "North", "South", "West", "East",
    "North-East", "South-West", "North-West", "South-East"
  ];

  const seasons = ["Winter", "Spring", "Summer", "Autumn"];

  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);

      
      alert("✅ Product added successfully!");
      setProduct(initialState);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-xl rounded-xl border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            ➕ Add New Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Date:</label>
              <input type="date" name="Date" value={product.Date} onChange={handleChange} required className="p-2 border rounded" />
            </div>

            {/* Store ID */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Store ID:</label>
              <select name="Store ID" value={product["Store ID"]} onChange={handleChange} required className="p-2 border rounded">
                <option value="">-- Select Store ID --</option>
                {storeIDs.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>

            {/* Product ID */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Product ID:</label>
              <select name="Product ID" value={product["Product ID"]} onChange={handleChange} required className="p-2 border rounded">
                <option value="">-- Select Product ID --</option>
                {productIDs.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Category:</label>
              <input type="text" name="Category" value={product.Category} onChange={handleChange} required className="p-2 border rounded" />
            </div>

            {/* Region */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Region:</label>
              <select name="Region" value={product.Region} onChange={handleChange} required className="p-2 border rounded">
                <option value="">-- Select Region --</option>
                {regions.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>

            {/* Seasonality */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Seasonality:</label>
              <select name="Seasonality" value={product.Seasonality} onChange={handleChange} required className="p-2 border rounded">
                <option value="">-- Select Season --</option>
                {seasons.map(season => <option key={season} value={season}>{season}</option>)}
              </select>
            </div>

            {/* Integer Fields */}
            {["Inventory Level", "Units Sold", "Units Ordered"].map((label) => (
              <div key={label} className="flex flex-col">
                <label className="font-medium mb-1">{label}:</label>
                <input type="number" name={label} value={product[label]} onChange={handleChange} required className="p-2 border rounded" />
              </div>
            ))}

            {/* Decimal Fields */}
            {["Demand Forecast", "Price", "Discount", "Competitor Pricing"].map((label) => (
              <div key={label} className="flex flex-col">
                <label className="font-medium mb-1">{label}:</label>
                <input
                  type="number"
                  step="0.01"
                  name={label}
                  value={product[label]}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded"
                />
              </div>
            ))}

            {/* Weather Condition */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Weather Condition:</label>
              <input type="text" name="Weather Condition" value={product["Weather Condition"]} onChange={handleChange} required className="p-2 border rounded" />
            </div>

            {/* Holiday/Promotion */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Holiday/Promotion:</label>
              <input type="number" name="Holiday/Promotion" value={product["Holiday/Promotion"]} onChange={handleChange} required className="p-2 border rounded" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              ✅ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
