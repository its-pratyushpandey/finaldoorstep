import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Container,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddCircle, Search } from '@mui/icons-material';
import ProductCard from '../Components/ProductCard';
import ProductForm from '../Components/ProductForm';
import { motion } from 'framer-motion';

const ApiProducts = () => {
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=12')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleAddProduct = (newProduct) => {
    const customProduct = {
      ...newProduct,
      id: Date.now(),
      image: 'https://via.placeholder.com/150',
    };
    setProducts([customProduct, ...products]);
    showNotification('Product added successfully!', 'success');
  };

  const handleAddToCart = (product) => {
    showNotification(`${product.title} added to Cart!`, 'success');
  };

  const handleAddToWishlist = (product) => {
    showNotification(`${product.title} added to Wishlist!`, 'info');
  };

  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          mb: 4,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Our Products
      </Typography>

      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <ProductForm onAddProduct={handleAddProduct} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <IconButton
            color="primary"
            sx={{
              background: '#64ffda',
              '&:hover': { backgroundColor: '#52e0c4' },
              borderRadius: '50%',
              p: 2,
            }}
          >
            <AddCircle sx={{ fontSize: 36 }} />
          </IconButton>
        </motion.div>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 25 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleAddToWishlist(product)}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={notificationType} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            color="secondary"
            sx={{
              background: '#fbc02d',
              '&:hover': { backgroundColor: '#f57f17' },
              borderRadius: '50%',
              p: 2,
            }}
          >
            <Search sx={{ fontSize: 36 }} />
          </IconButton>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ApiProducts;
