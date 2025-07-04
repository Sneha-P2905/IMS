import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                {/* Logo */}
                <h1 style={styles.logo}>Inventory Management</h1>

                {/* Navigation Links */}
                <ul style={styles.navLinks}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    <li><Link to="/add-product" style={styles.link}>Add Product</Link></li>
                    <li><Link to="/orders" style={styles.link}>Orders</Link></li>
                    <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
                 

                </ul>
            </div>
        </nav>
    );
};

// ✅ Embedded CSS Styles
const styles = {
    navbar: {
        background: "#2c3e50",  // Dark blue shade
        padding: "15px 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    container: {
        maxWidth: "1100px",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
    },
    logo: {
        color: "#ecf0f1",  // Light greyish white
        fontSize: "22px",
        fontWeight: "bold",
        letterSpacing: "1px",
    },
    navLinks: {
        display: "flex",
        gap: "20px",
        listStyle: "none",
        padding: "0",
        margin: "0",
    },
    link: {
        color: "#ecf0f1",
        fontSize: "16px",
        fontWeight: "500",
        textDecoration: "none",
        transition: "color 0.3s ease",
    },
    linkHover: {
        color: "#1abc9c",  // Elegant green on hover
    }
};

export default Navbar;
