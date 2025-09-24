import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      alert("Per favore inserisci nome utente e password.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography component="h2" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Accedi
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome Utente"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Accedi
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 