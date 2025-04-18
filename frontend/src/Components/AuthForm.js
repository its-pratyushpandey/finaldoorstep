// src/Components/AuthForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';

const AuthForm = ({ onSubmit, type = 'login', loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const isLogin = type === 'login';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
        throw new Error('Please fill all fields');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {!isLogin && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          autoFocus
        />
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Register'}
      </Button>
    </Box>
  );
};

export default AuthForm;
