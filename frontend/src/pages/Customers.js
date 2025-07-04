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
} from "@mui/material";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get("http://localhost:5000/api/customers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching customers:", error));
  };

  const handleOpen = (customer = null) => {
    setEditingCustomer(customer);
    setFormData(customer ? { ...customer } : { name: "", email: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCustomer(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingCustomer) {
      axios.put(`http://localhost:5000/api/customers/${editingCustomer._id}`, formData)
        .then(() => {
          fetchCustomers();
          handleClose();
        })
        .catch(error => console.error("Error updating customer:", error));
    } else {
      axios.post("http://localhost:5000/api/customers", formData)
        .then(() => {
          fetchCustomers();
          handleClose();
        })
        .catch(error => console.error("Error adding customer:", error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => fetchCustomers())
      .catch(error => console.error("Error deleting customer:", error));
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Customer Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Add Customer
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpen(customer)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(customer._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCustomer ? "Edit Customer" : "Add Customer"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
          <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editingCustomer ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Customers;
