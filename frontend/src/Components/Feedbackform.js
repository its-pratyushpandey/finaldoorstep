import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Container, Typography, Alert,
  CircularProgress, Box, Paper, InputAdornment,
  MenuItem, Select, FormControl, InputLabel, Snackbar
} from '@mui/material';
import {
  Send, Email, Person, Comment, Feedback as FeedbackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import MuiAlert from '@mui/material/Alert';

const floatAnim = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '', category: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.post('https://doorstep-backend1.onrender.com/api/feedback/submit-feedback', formData);
      setMessage({ type: 'success', text: res.data.message || 'Feedback submitted!' });
      setFormData({ name: '', email: '', feedback: '', category: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Submission failed.' });
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: "linear-gradient(to right, #a277f4, #946eea)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        overflow: 'hidden'
      }}
    >
      <Container
        maxWidth="sm"
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(10, 25, 47, 0.95)",
            backdropFilter: 'blur(12px)',
            color: "#ffffff",
            boxShadow: '0 0 30px rgba(162, 119, 244, 0.3)',
            transition: 'box-shadow 0.5s ease-in-out',
            '&:hover': {
              boxShadow: '0 0 40px rgba(162, 119, 244, 0.5)',
            }
          }}
          component={motion.div}
          whileHover={{ scale: 1.015 }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: "#64ffda" }}>
            <motion.div variants={floatAnim} initial="initial" animate="animate" style={{ display: 'inline-block' }}>
              <FeedbackIcon sx={{ verticalAlign: 'middle', fontSize: 34, mr: 1 }} />
            </motion.div>
            Share Your Feedback
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <TextField
              fullWidth label="Your Name" name="name" value={formData.name}
              onChange={handleChange} required margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <motion.div variants={floatAnim} initial="initial" animate="animate">
                      <Person sx={{ color: "#64ffda" }} />
                    </motion.div>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "#fff" },
                label: { color: "#64ffda" },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: "#64ffda" },
                  '&:hover fieldset': { borderColor: "#64ffda" },
                  '&.Mui-focused fieldset': { borderColor: "#64ffda", boxShadow: '0 0 8px #64ffda' }
                }
              }}
            />

            {/* Email */}
            <TextField
              fullWidth label="Your Email" name="email" type="email" value={formData.email}
              onChange={handleChange} required margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <motion.div variants={floatAnim} initial="initial" animate="animate">
                      <Email sx={{ color: "#64ffda" }} />
                    </motion.div>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "#fff" },
                label: { color: "#64ffda" },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: "#64ffda" },
                  '&:hover fieldset': { borderColor: "#64ffda" },
                  '&.Mui-focused fieldset': { borderColor: "#64ffda", boxShadow: '0 0 8px #64ffda' }
                }
              }}
            />

            {/* Category */}
            <FormControl fullWidth required margin="normal">
              <InputLabel sx={{ color: "#64ffda" }}>Feedback Type</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                sx={{
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": { borderColor: "#64ffda" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#64ffda" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#64ffda" }
                }}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Bug Report">Bug Report</MenuItem>
                <MenuItem value="Feature Request">Feature Request</MenuItem>
              </Select>
            </FormControl>

            {/* Feedback */}
            <TextField
              fullWidth label="Your Feedback" name="feedback" value={formData.feedback}
              onChange={handleChange} required multiline rows={4} margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <motion.div variants={floatAnim} initial="initial" animate="animate">
                      <Comment sx={{ color: "#64ffda" }} />
                    </motion.div>
                  </InputAdornment>
                ),
              }}
              sx={{
                textarea: { color: "#fff" },
                label: { color: "#64ffda" },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: "#64ffda" },
                  '&:hover fieldset': { borderColor: "#64ffda" },
                  '&.Mui-focused fieldset': { borderColor: "#64ffda", boxShadow: '0 0 8px #64ffda' }
                }
              }}
            />

            {/* Submit Button */}
            <Box textAlign="center" mt={3}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={loading ? <CircularProgress size={20} sx={{ color: "#a277f4" }} /> : <Send />}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#64ffda",
                    color: "#0a192f",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    "&:hover": {
                      backgroundColor: "#52e0c4",
                      boxShadow: '0 4px 20px rgba(100,255,218,0.4)'
                    }
                  }}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </Box>
          </form>

          {/* Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert elevation={6} variant="filled" severity={message.type || "success"}>
              {message.text}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeedbackForm;
