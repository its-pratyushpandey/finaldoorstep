import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  Box,
  CardMedia,
  IconButton,
  Tooltip,
  Modal,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import {
  DeleteForever,
  AddShoppingCart,
  Visibility,
  CompareArrows,
  WhatsApp,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [compareItems, setCompareItems] = useState([]);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleShare = (item) => {
    const link = `https://yourstore.com/product/${item.id}`;
    const text = `Check this out: ${item.title} - $${item.price} - ${link}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  const handleCompare = (item) => {
    if (compareItems.find((i) => i.id === item.id)) return;
    if (compareItems.length === 2) {
      alert('You can only compare two items at a time.');
      return;
    }
    setCompareItems((prev) => [...prev, item]);
  };

  const handleCloseCompareModal = () => setCompareItems([]);

  return (
    <Container sx={{ mt: 4, maxWidth: '1200px' }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: '#64ffda',
          textAlign: 'center',
          letterSpacing: 1.2,
        }}
      >
        Your Wishlist
      </Typography>

      <List>
        {wishlistItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <ListItem
              sx={{
                background: 'linear-gradient(to right, #112240, #0a192f)',
                borderRadius: 3,
                mb: 2,
                p: 2,
                boxShadow: '0px 8px 24px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: '0.3s ease',
                '&:hover': {
                  transform: 'scale(1.015)',
                  background: 'linear-gradient(to right, #0a192f, #112240)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 2,
                  objectFit: 'contain',
                  backgroundColor: '#fff',
                }}
              />

              <Box sx={{ flex: 1, mx: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#64ffda', mt: 1 }}>
                  ${item.price}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Tooltip title="View Details" arrow>
                  <IconButton onClick={() => handleViewDetails(item)} sx={{ color: '#64ffda' }}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move to Cart" arrow>
                  <IconButton onClick={() => moveToCart(item)} sx={{ color: '#64ffda' }}>
                    <AddShoppingCart />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Compare" arrow>
                  <IconButton onClick={() => handleCompare(item)} sx={{ color: '#64ffda' }}>
                    <CompareArrows />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove" arrow>
                  <IconButton onClick={() => removeFromWishlist(item.id)} sx={{ color: '#f44336' }}>
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share on WhatsApp" arrow>
                  <IconButton onClick={() => handleShare(item)} sx={{ color: '#25D366' }}>
                    <WhatsApp />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </motion.div>
        ))}
      </List>

      {wishlistItems.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#ccc', mt: 6 }}>
          Your wishlist is empty. Add some amazing products!
        </Typography>
      )}

      {/* View Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: '#112240',
            color: '#fff',
            p: 4,
            borderRadius: 3,
            maxWidth: 600,
            mx: 'auto',
            mt: 10,
            boxShadow: 24,
            outline: 'none',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#64ffda' }}
          >
            <Close />
          </IconButton>

          {selectedItem && (
            <Box>
              <CardMedia
                component="img"
                image={selectedItem.image}
                alt={selectedItem.title}
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                  borderRadius: 2,
                  background: '#fff',
                  mb: 2,
                }}
              />
              <Typography variant="h5" sx={{ mb: 1 }}>
                {selectedItem.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>
                ${selectedItem.price}
              </Typography>
              <Typography variant="body1">{selectedItem.description}</Typography>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Compare Modal */}
      <Modal open={compareItems.length === 2} onClose={handleCloseCompareModal}>
        <Box
          sx={{
            backgroundColor: '#0a192f',
            color: '#fff',
            padding: 4,
            borderRadius: 3,
            maxWidth: 1000,
            margin: 'auto',
            mt: 10,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Compare Products
          </Typography>
          <Grid container spacing={3}>
            {compareItems.map((item, idx) => (
              <Grid item xs={6} key={idx}>
                <Paper sx={{ padding: 2, backgroundColor: '#112240', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography sx={{ color: '#64ffda' }}>${item.price}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{item.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button
            onClick={handleCloseCompareModal}
            sx={{ mt: 4, color: '#64ffda', display: 'block', mx: 'auto' }}
          >
            Close Comparison
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Wishlist;
