import React, { useEffect, useState } from 'react';
import axios from '../utils/Axios'; // Ensure this file has the baseURL set
import {
  Box, Card, CardActions, CardContent, CardMedia, Grid,
  Typography, Button, CircularProgress, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Slide, Tooltip
} from '@mui/material';
import {
  ShoppingCartRounded, InfoRounded, FavoriteRounded,
  FavoriteBorderRounded, CloseRounded
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const ApiProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products: ", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        if (token) {
          const res = await axios.get('/api/v1/wishlist', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWishlist(res.data.products || []);
        }
      } catch (err) {
        console.error("Error fetching wishlist: ", err.response?.data || err.message);
      }
    };

    fetchData();
    if (token) fetchWishlist();
  }, [token]);

  const isInWishlist = (product) =>
    wishlist.some(item => item.productId === product.id);
  
  // Handle adding/removing products from the wishlist
  const handleAddToWishlist = async (product) => {
    const existing = wishlist.find(item => item.productId === product.id);
  
    try {
      if (!existing) {
        const payload = {
          productId: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
        };
  
        const res = await axios.post('/api/v1/wishlist', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setWishlist(res.data.products); // backend should return updated list
        toast.success("Added to Wishlist ❤️");
      } else {
        await axios.delete(`/api/v1/wishlist/${existing._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setWishlist(prev => prev.filter(item => item._id !== existing._id));
        toast.info("Removed from Wishlist 💔");
      }
    } catch (err) {
      console.error("Wishlist update failed: ", err.response?.data || err.message);
      toast.error(`Wishlist action failed: ${err.response?.data?.message || err.message}`);
    }
  };
  

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
      toast.success("Added to Cart 🛒");
      navigate('/cart');
    } else {
      toast.info("Already in Cart 🛒");
    }
  };

  // Handle viewing product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, background: "linear-gradient(to bottom right, #f0e7ff, #e2d1ff)" }}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#4B0082' }}>
        ✨ Premium Products
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    background: '#fff'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {product.title.length > 40 ? `${product.title.slice(0, 40)}...` : product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                      {product.description.length > 60
                        ? `${product.description.slice(0, 60)}...`
                        : product.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', color: '#4B0082' }}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Tooltip title="Add to Wishlist">
                      <IconButton
                        onClick={() => handleAddToWishlist(product)}
                        sx={{ color: '#e91e63' }}
                      >
                        {isInWishlist(product) ? <FavoriteRounded /> : <FavoriteBorderRounded />}
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartRounded />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        background: 'linear-gradient(to right, #9d71f8, #7053d9)',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(to right, #a781fc, #7d5cf9)'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleViewDetails(product)} sx={{ color: '#4B0082' }}>
                        <InfoRounded />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedProduct && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
            Product Details
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{ width: '100%', objectFit: 'contain', maxHeight: '400px' }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                {selectedProduct.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#888', mt: 1 }}>
                Category: {selectedProduct.category}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, color: '#4B0082', fontWeight: 'bold' }}>
                ${selectedProduct.price}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleAddToWishlist(selectedProduct)}
              startIcon={<FavoriteRounded />}
            >
              {isInWishlist(selectedProduct) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(selectedProduct)}
              startIcon={<ShoppingCartRounded />}
            >
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ApiProducts;
