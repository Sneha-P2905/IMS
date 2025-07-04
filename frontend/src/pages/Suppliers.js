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

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({ name: "", contact: "", address: "" });

  // Fetch suppliers from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers")
      .then(response => setSuppliers(response.data))
      .catch(error => console.error("Error fetching suppliers:", error));
  }, []);

  // Open dialog for adding/editing supplier
  const handleOpen = (supplier = null) => {
    setEditingSupplier(supplier);
    setFormData(supplier ? { ...supplier } : { name: "", contact: "", address: "" });
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setEditingSupplier(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update supplier
  const handleSubmit = () => {
    if (editingSupplier) {
      // Update existing supplier
      axios.put(`http://localhost:5000/api/suppliers/${editingSupplier._id}`, formData)
        .then(response => {
          setSuppliers(suppliers.map(s => (s._id === editingSupplier._id ? response.data : s)));
          handleClose();
        })
        .catch(error => console.error("Error updating supplier:", error));
    } else {
      // Add new supplier
      axios.post("http://localhost:5000/api/suppliers", formData)
        .then(response => {
          setSuppliers([...suppliers, response.data]);
          handleClose();
        })
        .catch(error => console.error("Error adding supplier:", error));
    }
  };

  // Delete supplier
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/suppliers/${id}`)
      .then(() => {
        setSuppliers(suppliers.filter(s => s._id !== id));
      })
      .catch(error => console.error("Error deleting supplier:", error));
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Supplier Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Add Supplier
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpen(supplier)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(supplier._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Supplier Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
          <TextField label="Contact" name="contact" fullWidth margin="normal" value={formData.contact} onChange={handleChange} />
          <TextField label="Address" name="address" fullWidth margin="normal" value={formData.address} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editingSupplier ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Suppliers;
