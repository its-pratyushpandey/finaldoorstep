import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Snackbar,
  Alert,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Subject,
  Message,
  Send,
  WhatsApp,
  Instagram,
  Telegram,
  LinkedIn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "../css/Cart.css"; // Background image animation

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending data to Formspree
    try {
      const response = await fetch("https://formspree.io/f/mqapvbkv", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSnackbarMessage("✅ Thank you! We'll get back to you shortly.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSnackbarMessage("❌ Something went wrong. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("❌ Something went wrong. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box className="image-background" sx={{ minHeight: "100vh", py: 8 }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 5,
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 12px 25px rgba(0, 0, 0, 0.1)",
              color: "black",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "black" }}
              >
                📬 Contact Us
              </Typography>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ mb: 3, color: "black" }}
              >
                We'd love to hear from you. Fill out the form below and we'll get back shortly.
              </Typography>
            </motion.div>
            <Divider sx={{ mb: 4 }} />

            <Box component="form" onSubmit={handleSubmit}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Tooltip title="Your full name" placement="top" arrow>
                  <TextField
                    label="Full Name"
                    name="name"
                    fullWidth
                    required
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        color: "black",
                        "& input": { color: "black" },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: { color: "black" },
                    }}
                  />
                </Tooltip>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Tooltip title="Your email address" placement="top" arrow>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        color: "black",
                        "& input": { color: "black" },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: { color: "black" },
                    }}
                  />
                </Tooltip>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Tooltip title="Message subject" placement="top" arrow>
                  <TextField
                    label="Subject"
                    name="subject"
                    fullWidth
                    margin="normal"
                    value={form.subject}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        color: "black",
                        "& input": { color: "black" },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Subject sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: { color: "black" },
                    }}
                  />
                </Tooltip>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Tooltip title="Write your message" placement="top" arrow>
                  <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    fullWidth
                    required
                    margin="normal"
                    value={form.message}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        color: "black",
                        "& textarea": { color: "black" },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Message sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      sx: { color: "black" },
                    }}
                  />
                </Tooltip>
              </motion.div>

              <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  endIcon={<Send />}
                  sx={{
                    mt: 4,
                    py: 1.3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #2196f3, #64b5f6)",
                    color: "#fff",
                    boxShadow: "0 6px 16px rgba(33, 150, 243, 0.25)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Tooltip title="Contact us on WhatsApp" placement="top" arrow>
                <IconButton
                  href="https://wa.me/7562920811"
                  target="_blank"
                  sx={{
                    m: 1,
                    backgroundColor: "#25D366",
                    "&:hover": {
                      backgroundColor: "#128C7E",
                    },
                  }}
                >
                  <WhatsApp sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Follow us on Instagram" placement="top" arrow>
                <IconButton
                  href="https://www.instagram.com/its.pratyush_pandey"
                  target="_blank"
                  sx={{
                    m: 1,
                    backgroundColor: "#E1306C",
                    "&:hover": {
                      backgroundColor: "#C13584",
                    },
                  }}
                >
                  <Instagram sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Chat with us on Telegram" placement="top" arrow>
                <IconButton
                  href="https://t.me/@pratyushpandey_1"
                  target="_blank"
                  sx={{
                    m: 1,
                    backgroundColor: "#0088cc",
                    "&:hover": {
                      backgroundColor: "#007bb5",
                    },
                  }}
                >
                  <Telegram sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Connect with us on LinkedIn" placement="top" arrow>
                <IconButton
                  href="https://www.linkedin.com/in/pratyush-pandey1" // replace with your LinkedIn URL
                  target="_blank"
                  sx={{
                    m: 1,
                    backgroundColor: "#0077b5",
                    "&:hover": {
                      backgroundColor: "#005582",
                    },
                  }}
                >
                  <LinkedIn sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
