import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Link,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#f57c00',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default function PasskeySignInPage() {
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    alert(`Signing in with email: ${email} and passkey: ${passkey}`);
    // Add your authentication logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={8} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Lock sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h5" fontWeight="600">
              Sign In
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSignIn} sx={{ width: '100%', mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passkey"
              label="Passkey"
              type={showPasskey ? "text" : "password"}
              id="passkey"
              autoComplete="current-password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPasskey(!showPasskey)} edge="end">
                      {showPasskey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Sign In
            </Button>

            <Box display="flex" justifyContent="space-between">
              <Link href="#" variant="body2" color="primary">
                Forgot Passkey?
              </Link>
              <Link href="#" variant="body2" color="secondary">
                Create an Account
              </Link>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
