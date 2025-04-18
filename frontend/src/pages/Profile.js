import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText,
  Card, CardContent, CardMedia, IconButton
} from '@mui/material';
import {
  FavoriteRounded, ShoppingCartRounded, LocalShippingRounded,
  SettingsRounded, LogoutRounded, PersonRounded, 
   InfoRounded, CameraAlt
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const MotionPaper = motion(Paper);

const Profile = () => {
  const { user, logout } = useAuth();
  const { wishlist = [] } = useWishlist();
  const { cartItems = [] } = useCart();

  const [activeTab, setActiveTab] = useState('settings');
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(profilePic);

  const orders = [
    { id: '3432', status: 'Delivered', date: '2024-04-12' },
    { id: '1212', status: 'In Transit', date: '2024-04-14' },
    { id: '9982', status: 'Out for Delivery', date: '2024-04-15' }
  ];

  const motionFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return <Typography>⚙️ Manage your account settings, password, and preferences.</Typography>;
      case 'about':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, background: '#0a192f', color: '#fff', borderRadius: 4 }}>
                <Typography variant="h6">About Me</Typography>
                <Typography variant="body2" color="gray">Name: {user?.name}</Typography>
                <Typography variant="body2" color="gray">Email: {user?.email}</Typography>
                <Typography variant="body2" color="gray">Phone: {user?.phone || 'N/A'}</Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      case 'wishlist':
        return (
          <Grid container spacing={2}>
            {wishlist.length === 0 ? (
              <Typography>No items in wishlist.</Typography>
            ) : (
              wishlist.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card sx={{ background: '#0a192f', color: '#fff', borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'contain', p: 2 }}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="#64ffda">${item.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        );
      case 'cart':
        return (
          <Grid container spacing={2}>
            {cartItems.length === 0 ? (
              <Typography>No items in cart.</Typography>
            ) : (
              cartItems.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card sx={{ background: '#0a192f', color: '#fff', borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'contain', p: 2 }}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="#52e0c4">
                        ${item.price} × {item.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        );
      case 'orders':
        return (
          <Grid container spacing={2}>
            {orders.map((order, i) => (
              <Grid item xs={12} key={i}>
                <Paper
                  sx={{
                    background: 'rgba(255,255,255,0.05)',
                    p: 2,
                    borderRadius: 3,
                    color: '#fff',
                    borderLeft: '4px solid #64ffda'
                  }}
                >
                  <Typography variant="subtitle1">
                    🛒 Order #{order.id}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Status: {order.status} | Date: {order.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0a192f, #112240)',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <motion.div {...motionFade}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          <PersonRounded sx={{ mr: 1 }} /> Profile Overview
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <MotionPaper
            elevation={6}
            {...motionFade}
            sx={{
              p: 3,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Profile Picture Upload */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-pic-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-pic-upload">
                <IconButton
                  component="span"
                  sx={{
                    backgroundColor: '#64ffda',
                    borderRadius: '50%',
                    p: 1,
                    boxShadow: 2,
                    '&:hover': { backgroundColor: '#52e0c4' }
                  }}
                >
                  <CameraAlt sx={{ color: '#0a192f' }} />
                </IconButton>
              </label>
              <Box sx={{ mt: 2 }}>
                <img
                  src={preview || 'https://www.fillmurray.com/120/120'}
                  alt="Profile"
                  style={{
                    borderRadius: '50%',
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    border: '3px solid #64ffda'
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

            <List>
              {[
                { icon: <SettingsRounded />, label: 'Account Settings', key: 'settings' },
                { icon: <InfoRounded />, label: 'About Me', key: 'about' },
                { icon: <FavoriteRounded />, label: 'Wishlist', key: 'wishlist' },
                { icon: <ShoppingCartRounded />, label: 'Cart Items', key: 'cart' },
                { icon: <LocalShippingRounded />, label: 'My Orders', key: 'orders' },
                { icon: <LogoutRounded />, label: 'Logout', key: 'logout', onClick: logout },
              ].map((item, idx) => (
                <ListItem
                  key={idx}
                  onClick={() => item.key === 'logout' ? logout() : setActiveTab(item.key)}
                  button
                >
                  <ListItemIcon sx={{ color: '#64ffda' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </MotionPaper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <MotionPaper
            elevation={6}
            {...motionFade}
            sx={{
              p: 3,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
            }}
          >
            {renderTabContent()}
          </MotionPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
