import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../Components/AuthForm';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Link, Paper, Divider, Avatar, Stack
} from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const Register = () => {
  const { register } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0a192f, #112240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <MotionPaper
        elevation={8}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: '#64ffda', width: 56, height: 56 }}>
            <PersonAddAltRoundedIcon sx={{ color: '#0a192f' }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="body2" color="gray" textAlign="center">
            Sign up to explore, manage orders, and save your wishlist.
          </Typography>
        </Stack>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Auth Form */}
        <AuthForm onSubmit={register} type="register" />

        {/* Bottom Link */}
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ color: '#64ffda' }}>
              Login <LoginRoundedIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Link>
          </Typography>
        </Box>
      </MotionPaper>
    </Box>
  );
};

export default Register;
