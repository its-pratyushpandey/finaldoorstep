import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Snackbar, CircularProgress, Dialog,
  DialogTitle, DialogContent, DialogActions, Tooltip, Box, Typography, Slide
} from '@mui/material';
import {
  Add, Edit, Delete, QrCode, Category, PriceChange, ShoppingBag, Search
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_PRODUCTS_API_URL || 'http://latestdoorstep-backend-6.onrender.com/api/products';

const SlideTransition = (props) => <Slide direction="up" {...props} />;

const ProductMList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [qrOpen, setQROpen] = useState(false);
  const [qrProduct, setQRProduct] = useState(null);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async () => {
    try {
      const productData = { name, price, category };
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData);
        setMessage("Product updated successfully!");
      } else {
        await axios.post(API_URL, productData);
        setMessage("Product added successfully!");
      }

      setEditingId(null);
      setName('');
      setPrice('');
      setCategory('');
      setSnackbarOpen(true);
      fetchProducts();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Product deleted successfully!");
      setSnackbarOpen(true);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setModalOpen(true);
  };

  const handleShowQR = (product) => {
    setQRProduct(product);
    setQROpen(true);
  };

  const handleSearch = useCallback(() => {
    const lower = search.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container maxWidth="md" sx={{
        backgroundColor: "rgba(17, 34, 64, 0.95)",
        borderRadius: 4,
        p: 4,
        color: "#e0f7fa",
        boxShadow: "0 0 40px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)"
      }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#e0f7fa",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 1
          }}
        >
          Product Management
        </Typography>

        <Box display="flex" gap={2} mb={3} alignItems="center">
          <Search sx={{ color: "#64ffda" }} />
          <TextField
            label="Search by Name or Category"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              input: { color: "#64ffda" },
              label: { color: "#64ffda" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#64ffda" },
                "&:hover fieldset": { borderColor: "#64ffda" },
                "&.Mui-focused fieldset": { borderColor: "#64ffda" }
              }
            }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: "#64ffda",
                color: "#112240",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#52e0c4"
                }
              }}
            >
              Add
            </Button>
          </motion.div>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1E88E5" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}><ShoppingBag fontSize="small" /> Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}><PriceChange fontSize="small" /> Price ($)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}><Category fontSize="small" /> Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress sx={{ color: "#64ffda" }} />
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    whileHover={{ scale: 1.01, backgroundColor: "#0d253f" }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'table-row' }}
                  >
                    <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>${product.price}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{product.category}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditProduct(product)} sx={{ color: "#64ffda" }}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteProduct(product._id)} sx={{ color: "#ff1744" }}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="QR Code">
                        <IconButton onClick={() => handleShowQR(product)} sx={{ color: "#7c4dff" }}>
                          <QrCode />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Add/Edit */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} TransitionComponent={SlideTransition}>
          <DialogTitle sx={{ backgroundColor: "#112240", color: "#64ffda" }}>
            {editingId ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#0a192f" }}>
            <TextField
              label="Product Name"
              fullWidth
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ input: { color: "#64ffda" }, label: { color: "#64ffda" } }}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="dense"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{ input: { color: "#64ffda" }, label: { color: "#64ffda" } }}
            />
            <TextField
              label="Category"
              fullWidth
              margin="dense"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ input: { color: "#64ffda" }, label: { color: "#64ffda" } }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#0a192f" }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: "#ff4081" }}>Cancel</Button>
            <Button
              onClick={handleSaveProduct}
              variant="contained"
              sx={{
                backgroundColor: "#64ffda",
                color: "#112240",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#52e0c4" }
              }}
            >
              {editingId ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* QR Code Modal */}
        <Dialog open={qrOpen} onClose={() => setQROpen(false)} TransitionComponent={SlideTransition}>
          <DialogTitle sx={{ backgroundColor: "#112240", color: "#64ffda" }}>
            QR Code for {qrProduct?.name}
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', backgroundColor: "#0a192f" }}>
            {qrProduct && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <QRCodeCanvas
                  value={JSON.stringify(qrProduct)}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </motion.div>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#0a192f" }}>
            <Button onClick={() => setQROpen(false)} sx={{ color: "#64ffda" }}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          TransitionComponent={SlideTransition}
        >
          <MuiAlert elevation={6} variant="filled" severity="success">
            {message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </motion.div>
  );
};

export default ProductMList;
