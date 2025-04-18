// src/pages/AuthPage.js
import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Tabs, Tab } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../Components/AuthForm';

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const { login, register, loading } = useAuth();

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {tab === 0 ? 'Welcome Back 👋' : 'Join Us Today 🚀'}
          </Typography>
        </Box>

        <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 2 }}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tab === 0 ? (
          <AuthForm onSubmit={login} type="login" loading={loading} />
        ) : (
          <AuthForm onSubmit={register} type="register" loading={loading} />
        )}
      </Paper>
    </Container>
  );
};

export default AuthPage;
