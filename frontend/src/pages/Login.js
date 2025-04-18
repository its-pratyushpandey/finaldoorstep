import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../Components/AuthForm';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Link, Paper, Divider, Avatar
} from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

const Login = () => {
  const { login } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0a192f, #112240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          color: '#fff'
        }}
      >
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ bgcolor: '#64ffda', mx: 'auto', mb: 1 }}>
            <LoginRoundedIcon sx={{ color: '#0a192f' }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">Login</Typography>
          <Typography variant="body2" color="gray">
            Welcome back! Enter your credentials to continue.
          </Typography>
        </Box>

        <AuthForm onSubmit={login} type="login" />

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Box textAlign="center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover" color="#64ffda">
              Register now <HowToRegRoundedIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
