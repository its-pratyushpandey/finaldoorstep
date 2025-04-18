import React, { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import {
  Container,
  Typography,
  List,
  IconButton,
  Box,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Delete, AddShoppingCart, Favorite, RemoveCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { addToWishlist } = useContext(WishlistContext);

  const [shippingAddress, setShippingAddress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [customText, setCustomText] = useState('');

  const handleShippingChange = (event) => setShippingAddress(event.target.value);
  const handlePaymentMethodChange = (event) => setSelectedPaymentMethod(event.target.value);
  const handleShippingMethodChange = (event) => setShippingMethod(event.target.value);
  const handlePaymentDetailChange = (event) =>
    setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value });

  const handleQuantityUpdate = (productId, newQuantity) => updateQuantity(productId, newQuantity);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty!', 'error');
    } else if (!shippingAddress) {
      showNotification('Please enter your shipping address!', 'warning');
    } else if (selectedPaymentMethod === 'credit_card' && !paymentDetails.cardNumber) {
      showNotification('Please enter your credit card details!', 'warning');
    } else {
      showNotification('Checkout successful! Order placed!', 'success');
    }
  };

  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setOpenSnackbar(true);
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
    showNotification('All items have been removed from the cart.', 'success');
  };

  const handleCustomTextChange = (event) => setCustomText(event.target.value);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Your Cart
      </Typography>

      <List sx={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
        {cartItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 150 }}
          >
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                mb: 2,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                transition: '0.3s',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ borderRadius: 1, height: 150, objectFit: 'contain' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: '#64ffda' }}>${item.price}</Typography>
                    <Typography sx={{ color: '#fff', mb: 1 }}>
                      Color: {item.color || 'N/A'} | Size: {item.size || 'N/A'}
                    </Typography>

                    {item.customizable && (
                      <TextField
                        label="Customization (Optional)"
                        variant="outlined"
                        fullWidth
                        value={customText}
                        onChange={handleCustomTextChange}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          mb: 2,
                          '& .MuiInputLabel-root': { color: '#fff' },
                        }}
                      />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <IconButton
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          sx={{
                            color: '#64ffda',
                            '&:hover': {
                              color: '#52e0c4',
                              transform: 'scale(1.2)',
                            },
                          }}
                        >
                          <RemoveCircle />
                        </IconButton>
                        <Typography sx={{ color: '#fff', mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          sx={{
                            color: '#64ffda',
                            '&:hover': {
                              color: '#52e0c4',
                              transform: 'scale(1.2)',
                            },
                          }}
                        >
                          <AddShoppingCart />
                        </IconButton>
                      </Box>

                      <Tooltip title="Move to Wishlist" arrow>
                        <IconButton
                          onClick={() => addToWishlist(item)}
                          sx={{
                            color: '#e57373',
                            '&:hover': {
                              color: '#d32f2f',
                              transform: 'scale(1.2)',
                            },
                          }}
                        >
                          <Favorite />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Remove from Cart" arrow>
                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          sx={{
                            color: '#e57373',
                            '&:hover': {
                              color: '#d32f2f',
                              transform: 'scale(1.2)',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        ))}
      </List>

      <Button
        variant="outlined"
        color="error"
        onClick={handleClearCart}
        sx={{ mt: 3, width: '100%', borderRadius: 2 }}
      >
        Clear Cart
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
          Checkout
        </Typography>

        <TextField
          label="Shipping Address"
          variant="outlined"
          fullWidth
          value={shippingAddress}
          onChange={handleShippingChange}
          sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: '#fff' }}>Shipping Method</InputLabel>
          <Select
            value={shippingMethod}
            onChange={handleShippingMethodChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiSelect-icon': {
                color: '#fff',
              },
            }}
          >
            <MenuItem value="standard">Standard (5-7 Days)</MenuItem>
            <MenuItem value="express">Express (2-3 Days)</MenuItem>
            <MenuItem value="overnight">Overnight (1 Day)</MenuItem>
          </Select>
        </FormControl>

        <Typography sx={{ color: '#fff', mb: 1 }}>Payment Method</Typography>
        <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentMethodChange} sx={{ color: '#fff' }}>
          {['credit_card', 'paypal', 'bitcoin', 'apple_pay'].map((method) => (
            <FormControlLabel
              key={method}
              value={method}
              control={<Radio sx={{ color: '#64ffda' }} />}
              label={method.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              sx={{ color: '#fff' }}
            />
          ))}
        </RadioGroup>

        {selectedPaymentMethod === 'credit_card' && (
          <Box>
            <TextField
              label="Card Number"
              variant="outlined"
              name="cardNumber"
              fullWidth
              value={paymentDetails.cardNumber}
              onChange={handlePaymentDetailChange}
              sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  label="Expiry"
                  variant="outlined"
                  name="expiry"
                  fullWidth
                  value={paymentDetails.expiry}
                  onChange={handlePaymentDetailChange}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  name="cvv"
                  fullWidth
                  value={paymentDetails.cvv}
                  onChange={handlePaymentDetailChange}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleCheckout}
          sx={{
            mt: 3,
            backgroundColor: '#52e0c4',
            '&:hover': {
              backgroundColor: '#64ffda',
            },
            width: '100%',
            borderRadius: 2,
          }}
        >
          Checkout
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={notificationMessage.includes('error') ? 'error' : 'success'}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;
