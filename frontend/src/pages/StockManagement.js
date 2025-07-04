import React, { useState } from "react";
import { Typography, Paper, Button, TextField } from "@mui/material";

const StockManagement = () => {
  const [stock, setStock] = useState(10);

  const orderStock = () => {
    setStock(stock + 5);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Stock Management</Typography>
      <Typography>Current Stock: {stock}</Typography>
      <Button variant="contained" color="primary" onClick={orderStock} sx={{ marginTop: 2 }}>
        Order More Stock
      </Button>
    </Paper>
  );
};

export default StockManagement;
