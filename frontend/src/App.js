import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AuthPage from './Components/AuthPage';
import User from './Components/User';
import ProductMList from './Components/ProductMList';
import UserMList from './Components/UserMList';
import Feedbackform from './Components/Feedbackform';
import Profile from './pages/Profile';

import { useAuth } from './context/AuthContext';
import './app.css';

import ScrollToTop from './utils/ScrollToTop';
import Navbar from './pages/Navbar';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import ApiProducts from './pages/ApiProducts';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';

import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0a192f' },
    text: { primary: '#ffffff' },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const HomeMerged = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
    
      {/* HERO SECTION */}
      <Box className="home-hero-section">
        <Container maxWidth="lg" className="home-hero-content">
          <Typography variant="h2" className="hero-title" gutterBottom>
            ✨ Welcome to Doorstep
          </Typography>
          <Typography variant="h6" className="hero-subtitle" gutterBottom>
            {user
              ? `Welcome back, ${user.name}! Ready to explore more luxury?`
              : 'Elite products. Exclusive deals. Delivered to your doorstep.'}
          </Typography>

          {!user && (
            <Button
              variant="contained"
              size="large"
              className="hero-button"
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate('/auth')}
            >
              Start Shopping
            </Button>
          )}
        </Container>
      </Box>
    </>
  );
};

const Loader = () => (
  <Box className="loader-container">
    <CircularProgress sx={{ color: '#64ffda' }} />
  </Box>
);

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <>
      <Navbar />
      <Box sx={{ paddingTop: '64px', paddingX: 2 }}>{element}</Box>
    </>
  ) : (
    <Navigate to="/auth" replace />
  );
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="app-wrapper">
        <ScrollToTop location={location} />
        <WishlistProvider>
          <CartProvider>
            <Routes>
              {/* Public Route */}
              <Route path="/auth" element={<PublicRoute element={<AuthPage />} />} />

              {/* Private Routes */}
              <Route path="/" element={<PrivateRoute element={<HomeMerged />} />} />
              <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
              <Route path="/wishlist" element={<PrivateRoute element={<Wishlist />} />} />
              <Route path="/user" element={<PrivateRoute element={<User />} />} />
              <Route path="/api-products" element={<PrivateRoute element={<ApiProducts />} />} />
              <Route path="/products-list" element={<PrivateRoute element={<ProductMList />} />} />
              <Route path="/users-list" element={<PrivateRoute element={<UserMList />} />} />
              <Route path="/feedback" element={<PrivateRoute element={<Feedbackform />} />} />
              <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
              <Route path="/orders" element={<PrivateRoute element={<OrdersPage />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
