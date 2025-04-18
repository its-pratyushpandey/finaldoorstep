import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../api/products';
import './Navbar.css';

import {
  AppBar, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Box, Tooltip
} from '@mui/material';

import {
  HomeOutlined, RocketLaunchOutlined, ShoppingCartOutlined,
  LoginOutlined, PersonAddAlt1Outlined, InventoryOutlined,
  MenuRounded, PeopleAltOutlined, MarkEmailReadOutlined,
  LogoutOutlined, StarPurple500Rounded, DiamondOutlined,
  AccountCircleOutlined, FavoriteBorderOutlined
} from '@mui/icons-material';

import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchProductsData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const publicMenuItems = [
    { text: 'Login', icon: <LoginOutlined />, link: '/login' },
    { text: 'Register', icon: <PersonAddAlt1Outlined />, link: '/register' }
  ];

  const authenticatedMenuItems = [
    { text: 'Home', icon: <HomeOutlined />, link: '/' },
    { text: 'API Products', icon: <RocketLaunchOutlined />, link: '/api-products' },
    { text: 'Cart', icon: <ShoppingCartOutlined sx={{ color: '#64ffda', fontSize: 28 }} />, link: '/cart' },
    { text: 'Contact Us', icon: <MarkEmailReadOutlined />, link: '/contact' },
    { text: 'Feedback', icon: <MarkEmailReadOutlined />, link: '/feedback' },
  ];

  const adminItems = [
    { text: 'Manage Products', icon: <InventoryOutlined />, link: '/products-list' },
    { text: 'Users', icon: <PeopleAltOutlined />, link: '/users-list' },
  ];

  const menuItems = isAuthenticated ? authenticatedMenuItems : publicMenuItems;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(to right, #9d71f8, #7053d9)",
          boxShadow: "0 10px 40px rgba(157, 113, 248, 0.5)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
                color: "#EEDCFF",
                transition: "0.3s",
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <MenuRounded fontSize="large" />
            </IconButton>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  fontFamily: "'Poppins', sans-serif",
                  background: "linear-gradient(90deg, #ffffff, #eeeeff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textTransform: "uppercase",
                  fontSize: "1.5rem"
                }}
              >
                <StarPurple500Rounded sx={{ mr: 1, color: '#fff' }} />
                Doorstep
              </Typography>
            </motion.div>
          </Box>

          {isAuthenticated && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title={user?.name || 'User'}>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "6px 10px",
                    borderRadius: "30px",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 0 12px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <AccountCircleOutlined sx={{ fontSize: 24, color: "#fff" }} />
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", fontWeight: 500, letterSpacing: 0.5 }}
                  >
                    {user?.name || 'User'}
                  </Typography>
                </motion.div>
              </Tooltip>

              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
                <Tooltip title="Logout">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      color: "#fff",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      boxShadow: "0 0 12px rgba(238,220,255,0.3)",
                      '&:hover': {
                        background: "rgba(255,255,255,0.2)",
                        boxShadow: "0 0 16px rgba(255,255,255,0.4)"
                      }
                    }}
                  >
                    <LogoutOutlined />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(to bottom, #9d71f8, #7053d9)",
            color: "#fff",
            width: 270,
            borderRight: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              sx={{ p: 2, textAlign: "center" }}
            >
              <StarPurple500Rounded sx={{ mr: 1 }} />
              Menu
            </Typography>
          </motion.div>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

          {/* ➤ Top Drawer Profile & Wishlist Shortcuts */}
          {isAuthenticated && (
            <Box sx={{ px: 2, pt: 1, pb: 2 }}>
              <List>
                <ListItemButton component={Link} to="/profile" sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ color: "#fff" }}><AccountCircleOutlined /></ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/wishlist">
                  <ListItemIcon sx={{ color: "#ffc400" }}><FavoriteBorderOutlined /></ListItemIcon>
                  <ListItemText primary="Wishlist" />
                </ListItemButton>
              </List>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 2 }} />
            </Box>
          )}

          {/* ➤ Main Navigation */}
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.link}
                    sx={{
                      color: "#f0f0f0",
                      "&:hover": {
                        backgroundColor: "rgba(238, 220, 255, 0.15)",
                        pl: 3,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#EEDCFF" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* ➤ Admin Section */}
          {isAuthenticated && (
            <>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />
              <Typography
                variant="subtitle1"
                sx={{
                  p: 2,
                  textAlign: "center",
                  color: "#EEDCFF",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                <DiamondOutlined sx={{ mr: 1 }} />
                Admin Panel
              </Typography>

              <List>
                {adminItems.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.2 }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={item.link}
                        sx={{
                          color: "#f0f0f0",
                          "&:hover": {
                            backgroundColor: "rgba(238, 220, 255, 0.15)",
                            pl: 3,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "#EEDCFF" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </>
          )}

          {/* ➤ Footer */}
          {isAuthenticated && (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" sx={{ color: "#f5e8ff" }}>
                <strong>Products:</strong> {loading ? 'Loading...' : products.length}
              </Typography>
              <Typography variant="body2" sx={{ color: "#f5e8ff" }}>
                <strong>User:</strong> {user?.name || 'Unknown'}
              </Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ p: 2, color: 'red' }}>
              <Typography variant="body2">Error: {error}</Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
