import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, CircularProgress, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Select,
  MenuItem, InputLabel, FormControl, Typography
} from '@mui/material';
import { Edit, Delete, AddShoppingCart, CheckCircle, Cancel } from '@mui/icons-material';

const API_URL = process.env.REACT_APP_API_URL || 'http://latestdoorstep-backend-6.onrender.com/api/orders';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch orders. Please try again later.');
    }
    setLoading(false);
  };

  const saveOrders = async () => {
    try {
      const ordersData = { name, price, status };
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, ordersData);
        setSnackbar({ open: true, message: 'Order updated successfully!', severity: 'success' });
        setEditingId(null);
      } else {
        await axios.post(API_URL, ordersData);
        setSnackbar({ open: true, message: 'Order added successfully!', severity: 'success' });
      }
      setName('');
      setPrice('');
      setStatus('');
      fetchOrders();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving order. Please try again.', severity: 'error' });
    }
  };

  const confirmDelete = (id) => {
    setOrderToDelete(id);
    setDialogOpen(true);
  };

  const deleteOrders = async () => {
    try {
      await axios.delete(`${API_URL}/${orderToDelete}`);
      setSnackbar({ open: true, message: 'Order deleted successfully!', severity: 'warning' });
      fetchOrders();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting order. Please try again.', severity: 'error' });
    }
    setDialogOpen(false);
    setOrderToDelete(null);
  };

  const editOrders = (order) => {
    setEditingId(order._id);
    setName(order.name);
    setPrice(order.price);
    setStatus(order.status);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Manage Orders <AddShoppingCart />
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={saveOrders} sx={{ mt: 2 }}>
        {editingId ? "Update Order" : "Add Order"}
      </Button>

      {loading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>
                    {order.status === 'Completed' ? (
                      <CheckCircle color="success" />
                    ) : order.status === 'Cancelled' ? (
                      <Cancel color="error" />
                    ) : (
                      order.status
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => editOrders(order)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => confirmDelete(order._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={deleteOrders}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderList;
