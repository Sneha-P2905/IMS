import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Button, Box, Typography, Container } from "@mui/material";
import Products from "./Products";
import Customers from "./Customers";
import Sales from "./Sales";
import StockManagement from "./StockManagement";
import SalesGraph from "./SalesGraph";
import Reports from "./Reports";
import Orders from "./Orders";
import Suppliers from "./Suppliers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Products");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      setUserRole(user.role);
    }
  }, [navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240 }}>
          <List>
            {["Products", "Customers", "Sales", "Stock Management", "Sales Graph", "Orders", "Suppliers", "Reports"]
              .filter((item) => userRole === "admin" || !["Reports"].includes(item)) // Only Admins see Reports
              .map((text) => (
                <ListItem button key={text} onClick={() => setSelectedSection(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Inventory Management Dashboard
            </Typography>
            <Button color="inherit" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 3 }}>
          {selectedSection === "Products" && <Products />}
          {selectedSection === "Customers" && <Customers />}
          {selectedSection === "Sales" && <Sales />}
          {selectedSection === "Stock Management" && <StockManagement />}
          {selectedSection === "Sales Graph" && <SalesGraph />}
          {selectedSection === "Orders" && <Orders />}
          {selectedSection === "Suppliers" && <Suppliers />}
          {selectedSection === "Reports" && userRole === "admin" && <Reports />}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;