import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

const Groups = ({ onAddReservation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    guests: 25,
    primo: "Lasagne",
    secondo: "Arrosto di vitello",
    dolce: "Tiramisù",
  });

  const menuOptions = {
    primi: ["Lasagne", "Risotto ai funghi", "Pasta al forno"],
    secondi: ["Arrosto di vitello", "Filetto di orata", "Pollo al curry"],
    dolci: ["Tiramisù", "Panna cotta", "Cheesecake"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guests') {
      const numGuests = Number(value);
      if (numGuests < 25 || numGuests > 100) {
        alert("Attenzione: La prenotazione gruppi è solo per 25-100 persone.");
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.date || formData.guests < 25 || formData.guests > 100) {
      alert("Per favore compila tutti i campi correttamente e assicurati che gli ospiti siano tra 25 e 100.");
      return;
    }

    const menuDetails = `Menu Fisso: Primo: ${formData.primo}, Secondo: ${formData.secondo}, Dolce: ${formData.dolce}`;
    onAddReservation(formData, menuDetails);
    
    navigate('/');
    alert(`Prenotazione GRUPPO per ${formData.name} confermata per il ${formData.date}!`);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: 'secondary.main' }}>
          <GroupIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Prenotazione Gruppi (25-100 Persone)
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nome Gruppo/Referente" name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Data Prenotazione" name="date" type="date" value={formData.date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Ospiti (25-100)" name="guests" type="number" inputProps={{ min: 25, max: 100 }} value={formData.guests} onChange={handleChange} required />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 2, mb: 2, borderBottom: '1px solid #ccc', pb: 1, color: 'primary.dark' }}>
            Selezione Menù Fisso
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Primo Piatto</InputLabel>
                <Select name="primo" value={formData.primo} label="Primo Piatto" onChange={handleChange}>
                  {menuOptions.primi.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Secondo Piatto</InputLabel>
                <Select name="secondo" value={formData.secondo} label="Secondo Piatto" onChange={handleChange}>
                  {menuOptions.secondi.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Dolce</InputLabel>
                <Select name="dolce" value={formData.dolce} label="Dolce" onChange={handleChange}>
                  {menuOptions.dolci.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 5, py: 1.5 }}
          >
            Conferma Prenotazione Gruppo
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Groups; 