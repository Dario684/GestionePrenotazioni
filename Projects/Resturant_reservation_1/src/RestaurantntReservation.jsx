import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const RestaurantReservation = ({ onAddReservation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guests' && Number(value) > 25) {
      alert("Attenzione: Prenotazioni superiori a 25 persone devono essere gestite come 'Prenotazioni Gruppi'. Seleziona la pagina 'Gruppi' nel menu.");
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time || formData.guests < 1) {
      alert("Per favore compila tutti i campi correttamente.");
      return;
    }
    onAddReservation(formData);
    navigate('/');
    alert(`Prenotazione per ${formData.name} confermata per il ${formData.date}!`);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          <EventAvailableIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Prenotazioni Tavolo Standard (max 25 persone)
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Data"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Ora"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Ospiti (max 25)"
                name="guests"
                type="number"
                inputProps={{ min: 1, max: 25 }}
                value={formData.guests}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 4, py: 1.5 }}
          >
            Conferma Prenotazione
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RestaurantReservation; 