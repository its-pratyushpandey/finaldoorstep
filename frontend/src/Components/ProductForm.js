import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ title: '', price: '', image: '' });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Add New Product</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField label="Title" name="title" value={product.title} onChange={handleChange} fullWidth />
        <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained">Add Product</Button>
      </Box>
    </Paper>
  );
};

export default ProductForm;
