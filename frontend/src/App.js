import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductPage from "./AddProduct";
import OrdersPage from "./OrdersPage";
import DashboardPage from "./DashboardPage";
import Navigation from "./Navigation";        // ✅ Correct

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
