import React, { useState } from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button as MuiButton, Typography, Container, Box, IconButton } from '@mui/material';
// ... altre importazioni
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Home from './Home.jsx';
import Login from './Login.jsx';
import RestaurantReservation from './RestaurantReservation';
import Groups from './Group.jsx'
import EditReservation from './EditReservation.jsx'; // <--- NUOVA IMPORTAZIONE


// Componente NavBar (visibile solo a utente loggato)
const NavBar = ({ handleLogout, user }) => (
// ... (Il codice di NavBar rimane invariato)
  <AppBar position="static" color="primary" elevation={2}>
    <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', flexGrow: 1, gap: 2, flexWrap: 'wrap' }}>
        <MuiButton component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
          Home
        </MuiButton>
        <MuiButton component={Link} to="/tavoli" color="inherit">
          Prenotazione Tavoli
        </MuiButton>
        <MuiButton component={Link} to="/Groups" color="inherit">
          Prenotazione Gruppi
        </MuiButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 } }}>
        <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium', display: { xs: 'none', sm: 'block' } }}>
          Utente: {user}
        </Typography>
        <MuiButton 
          onClick={handleLogout} 
          variant="contained" 
          size="small"
          color="error" 
          endIcon={<LogoutIcon />}
        >
          Logout
        </MuiButton>
      </Box>
    </Toolbar>
  </AppBar>
);


// Componente App principale
export default function App() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  // ... (handleLogin e handleLogout rimangono invariati)
  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  
  const handleAddReservation = (formData, details = "Tavolo Assegnato automaticamente") => { 
    const isGroup = Number(formData.guests) >= 25;
    
    const newReservation = {
      id: Date.now(),
      ...formData,
      table: isGroup ? "Prenotazione Gruppo" : details, 
      menuDetails: isGroup ? details : "N/A", 
      guests: Number(formData.guests),
    };
    setReservations((prev) => [...prev, newReservation]);
    return newReservation.id;
  };
  
  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // NUOVA FUNZIONE PER MODIFICARE LA PRENOTAZIONE
  const handleEditReservation = (updatedReservation) => {
    setReservations((prev) => 
      prev.map(r => r.id === updatedReservation.id ? updatedReservation : r)
    );
  };
  
  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ p: 0 }}>
        
        <Box sx={{ bgcolor: 'white', py: 3, boxShadow: 2 }}>
          <Typography variant="h4" component="h1" align="center" color="text.primary" sx={{ fontWeight: 700, px: 2 }}>
            Benvenuto nel sistema di prenotazioni
          </Typography>
        </Box>
        
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Box sx={{ pb: 5 }}>
            <NavBar handleLogout={handleLogout} user={user} />
            
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Routes>
                <Route path="/" element={<Home reservations={reservations} onDelete={handleDelete} />} />
                <Route path="/tavoli" element={<RestaurantReservation onAddReservation={handleAddReservation} />} />
                <Route path="/Groups" element={<Groups onAddReservation={handleAddReservation} />} /> 
                {/* NUOVA ROUTE PER LA MODIFICA */}
                <Route 
                    path="/edit/:id" 
                    element={<EditReservation reservations={reservations} onEditReservation={handleEditReservation} />} 
                />
              </Routes>
            </Box>
            
          </Box>
        )}
      </Container>
    </Box>
  );
}