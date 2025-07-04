import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";

const Reports = () => {
  const [salesReport, setSalesReport] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/sales")
      .then(response => setSalesReport(response.data))
      .catch(error => console.error("Error fetching sales report:", error));
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Sales & Inventory Reports</Typography>
      <pre>{JSON.stringify(salesReport, null, 2)}</pre>
    </Paper>
  );
};

export default Reports;
