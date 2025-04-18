import React, { useContext, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Snackbar,
  Alert,
  Tooltip,
  Grid,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { Facebook, Twitter, WhatsApp, LinkedIn, Email, CopyAll } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [openDetails, setOpenDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseDetails = () => setOpenDetails(false);
  const handleOpenDetails = () => setOpenDetails(true);

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `"${product.title}" added to Cart!`,
      severity: 'success',
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    const action = isInWishlist(product.id) ? 'removed from' : 'added to';
    setSnackbar({
      open: true,
      message: `"${product.title}" ${action} Wishlist!`,
      severity: action === 'added to' ? 'info' : 'warning',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const shareText = `Check out this product: ${product.title}`;
  const shareUrl = window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const handleShare = (platform) => {
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodedText}&body=${encodedText} ${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    window.open(shareLink, '_blank');
  };

  return (
    <>
      <Card
        component={motion.div}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200 }}
        sx={{
          maxWidth: 320,
          margin: 'auto',
          borderRadius: 4,
          background: '#112240',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 2, backgroundColor: '#0a192f' }}
        />
        <CardContent sx={{ px: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, minHeight: 48 }}
          >
            {product.title.length > 45
              ? `${product.title.substring(0, 45)}...`
              : product.title}
          </Typography>
          <Typography variant="body2" color="#64ffda" sx={{ fontWeight: 500 }}>
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Tooltip title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}>
            <IconButton
              onClick={handleToggleWishlist}
              sx={{ color: isInWishlist(product.id) ? 'red' : '#aaa' }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add to Cart">
            <Button
              onClick={handleAddToCart}
              startIcon={<AddShoppingCartIcon />}
              sx={{
                background: 'rgba(100, 255, 218, 0.1)',
                color: '#64ffda',
                border: '1px solid #64ffda',
                fontWeight: 'bold',
                borderRadius: 2,
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#64ffda',
                  color: '#0a192f',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Add
            </Button>
          </Tooltip>

          <Tooltip title="More Info & Share">
            <IconButton onClick={handleOpenDetails} sx={{ color: '#fbc02d' }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      {/* Dialog with Share Options */}
      <Dialog
        open={openDetails}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { backgroundColor: '#112240', color: '#fff', borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#64ffda' }}>
          {product.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: 8,
                background: '#0a192f',
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="#64ffda">
            Price: ${product.price}
          </Typography>

          <Divider sx={{ my: 3, backgroundColor: '#52e0c4' }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Share this product:
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Tooltip title="Facebook">
                <IconButton onClick={() => handleShare('facebook')} sx={{ color: '#3b5998' }}>
                  <Facebook sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Twitter">
                <IconButton onClick={() => handleShare('twitter')} sx={{ color: '#1DA1F2' }}>
                  <Twitter sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="WhatsApp">
                <IconButton onClick={() => handleShare('whatsapp')} sx={{ color: '#25D366' }}>
                  <WhatsApp sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="LinkedIn">
                <IconButton onClick={() => handleShare('linkedin')} sx={{ color: '#0077b5' }}>
                  <LinkedIn sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Email">
                <IconButton onClick={() => handleShare('email')} sx={{ color: '#d44638' }}>
                  <Email sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Copy Link">
                <IconButton onClick={() => handleShare('copy')} sx={{ color: '#ffffff' }}>
                  <CopyAll sx={{ fontSize: 35 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDetails}
            variant="outlined"
            sx={{
              borderColor: '#64ffda',
              color: '#64ffda',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#52e0c4',
                color: '#52e0c4',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            backgroundColor:
              snackbar.severity === 'success'
                ? '#64ffda'
                : snackbar.severity === 'info'
                ? '#2979ff'
                : '#ff7043',
            color: '#0a192f',
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
