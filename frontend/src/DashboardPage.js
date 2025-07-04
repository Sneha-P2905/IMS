// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ml-results/latest")
      .then((res) => {
        setMlData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching ML results:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-xl">Loading ML Dashboard...</div>;
  if (!mlData) return <div className="p-4 text-xl">No data available.</div>;

  const { accuracy, out_of_stock, near_out_of_stock, overstocked, timestamp } = mlData;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 ML Dashboard</h1>
      <p className="mb-6 text-gray-600">Last Updated: {new Date(timestamp).toLocaleString()}</p>
      <p className="mb-4 text-green-600 font-semibold">Model Accuracy: {accuracy * 100}%</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚨 Out of Stock</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-red-100">
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Inventory Level</th>
              </tr>
            </thead>
            <tbody>
              {out_of_stock.map((item, index) => (
                <tr key={index} className="hover:bg-red-50">
                  <td className="border px-4 py-2">{item["Product ID"]}</td>
                  <td className="border px-4 py-2">{item["Category"]}</td>
                  <td className="border px-4 py-2">{item["Region"]}</td>
                  <td className="border px-4 py-2">{item["Inventory Level"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">⚠️ Near Out of Stock</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Store ID</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Inventory Level</th>
                <th className="border px-4 py-2">Days Until Out</th>
              </tr>
            </thead>
            <tbody>
              {near_out_of_stock.map((item, index) => (
                <tr key={index} className="hover:bg-yellow-50">
                  <td className="border px-4 py-2">{item["Product ID"]}</td>
                  <td className="border px-4 py-2">{item["Store ID"]}</td>
                  <td className="border px-4 py-2">{item["Category"]}</td>
                  <td className="border px-4 py-2">{item["Region"]}</td>
                  <td className="border px-4 py-2">{item["Inventory Level"]}</td>
                  <td className="border px-4 py-2">{item["Days_Until_Out_of_Stock"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📦 Overstocked</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Store ID</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Inventory Level</th>
              </tr>
            </thead>
            <tbody>
              {overstocked.map((item, index) => (
                <tr key={index} className="hover:bg-green-50">
                  <td className="border px-4 py-2">{item["Product ID"]}</td>
                  <td className="border px-4 py-2">{item["Store ID"]}</td>
                  <td className="border px-4 py-2">{item["Category"]}</td>
                  <td className="border px-4 py-2">{item["Region"]}</td>
                  <td className="border px-4 py-2">{item["Inventory Level"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
