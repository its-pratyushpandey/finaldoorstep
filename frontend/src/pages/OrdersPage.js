import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Card, CardContent, CardActions,
  Button, CircularProgress, IconButton, Divider
} from '@mui/material';
import { Delete, CheckCircle, Error } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5555/api/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast.success("Order canceled successfully.");
  };

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Orders</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={50} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {orders.map((order) => (
            <Card key={order._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Order #{order._id}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Status: {order.status}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total: ${order.total}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Items:
                </Typography>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.title} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                {order.status === 'Pending' && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}
                {order.status === 'Completed' && (
                  <IconButton color="success">
                    <CheckCircle />
                  </IconButton>
                )}
                {order.status === 'Failed' && (
                  <IconButton color="error">
                    <Error />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
