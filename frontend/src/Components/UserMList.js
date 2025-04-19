import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box, Container, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Select, MenuItem, Typography, Tooltip,
  InputLabel, FormControl, Snackbar, CircularProgress
} from "@mui/material";
import {
  Edit, Delete, PersonAdd, SupervisorAccount, Email, PeopleAlt
} from "@mui/icons-material";
import MuiAlert from '@mui/material/Alert';
import { motion } from "framer-motion";

const API_URL = process.env.REACT_APP_USERS_API_URL || "https://doorstep-backend1.onrender.com/api/users";

const UserMList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const saveUser = async () => {
    try {
      const userData = { name, email, role };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, userData);
        setMessage("User updated successfully!");
      } else {
        await axios.post(API_URL, userData);
        setMessage("User added successfully!");
      }

      setEditingId(null);
      setName("");
      setEmail("");
      setRole("");
      setSnackbarOpen(true);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("User deleted successfully!");
      setSnackbarOpen(true);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    setEditingId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md" component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={6} sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#0a192f",
          color: "#64ffda",
          boxShadow: "0 0 30px rgba(100,255,218,0.2)"
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#ccd6f6"
          }}>
            <PeopleAlt sx={{ verticalAlign: "middle", mr: 1 }} />
            User Management Panel
          </Typography>

          <Paper sx={{
            p: 3,
            mb: 4,
            backgroundColor: "#112240",
            borderRadius: 3
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#64ffda" }}>
              {editingId ? "Edit User" : "Add New User"}
            </Typography>

            <TextField
              fullWidth
              margin="dense"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: <SupervisorAccount sx={{ mr: 1, color: "#64ffda" }} />
              }}
              sx={{
                input: { color: "#fff" },
                label: { color: "#64ffda" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#64ffda" },
                  "&:hover fieldset": { borderColor: "#52e0c4" },
                  "&.Mui-focused fieldset": { borderColor: "#52e0c4" }
                }
              }}
            />

            <TextField
              fullWidth
              margin="dense"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: "#64ffda" }} />
              }}
              sx={{
                input: { color: "#fff" },
                label: { color: "#64ffda" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#64ffda" },
                  "&:hover fieldset": { borderColor: "#52e0c4" },
                  "&.Mui-focused fieldset": { borderColor: "#52e0c4" }
                }
              }}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel sx={{ color: "#64ffda" }}>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#64ffda"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#52e0c4"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#52e0c4"
                  }
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Moderator">Moderator</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={saveUser}
              sx={{
                mt: 2,
                backgroundColor: "#64ffda",
                color: "#112240",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#52e0c4"
                }
              }}
            >
              {editingId ? "Update User" : "Add User"}
            </Button>
          </Paper>

          <TableContainer component={Paper} sx={{ backgroundColor: "#112240", borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1E88E5" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
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
                  users.map((user) => (
                    <TableRow key={user._id} hover sx={{ '&:hover': { backgroundColor: "#0d253f" } }}>
                      <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{user.role}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => editUser(user)} sx={{ color: "#64ffda" }}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => deleteUserById(user._id)} sx={{ color: "#ff1744" }}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert elevation={6} variant="filled" severity="success">
              {message}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserMList;
