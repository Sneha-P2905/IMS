import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify"; // Toasts for feedback
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    totalAmount: "",
    status: "pending"
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders")
      .then(response => setOrders(response.data))
      .catch(error => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      });
  };

  const handleOpen = (order = null) => {
    setEditingOrder(order);
    setFormData(order ? { ...order } : {
      customerName: "",
      product: "",
      quantity: 1,
      totalAmount: "",
      status: "pending"
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingOrder(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingOrder) {
      axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, formData)
        .then(() => {
          fetchOrders();
          handleClose();
          toast.success("Order updated successfully!");
        })
        .catch(error => {
          console.error("Error updating order:", error);
          toast.error("Failed to update order.");
        });
    } else {
      axios.post("http://localhost:5000/api/orders", formData)
        .then(() => {
          fetchOrders();
          handleClose();
          toast.success("Order added successfully!");
        })
        .catch(error => {
          console.error("Error adding order:", error);
          toast.error("Failed to add order.");
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/orders/${id}`)
      .then(() => {
        fetchOrders();
        toast.success("Order deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order.");
      });
  };

  const handleStatusUpdate = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus })
      .then(() => fetchOrders())
      .catch(error => {
        console.error("Error updating order status:", error);
        toast.error("Failed to update status.");
      });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Order Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Add Order
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="refunded">Refunded</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(order)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Order Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingOrder ? "Edit Order" : "Add Order"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Name"
            name="customerName"
            fullWidth
            margin="normal"
            value={formData.customerName}
            onChange={handleChange}
          />
          <TextField
            label="Product"
            name="product"
            fullWidth
            margin="normal"
            value={formData.product}
            onChange={handleChange}
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            fullWidth
            margin="normal"
            value={formData.quantity}
            onChange={handleChange}
          />
          <TextField
            label="Total Amount"
            name="totalAmount"
            type="number"
            fullWidth
            margin="normal"
            value={formData.totalAmount}
            onChange={handleChange}
          />
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="refunded">Refunded</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editingOrder ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Orders;
