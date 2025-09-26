import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Opzioni menu (copiate da Group.jsx per coerenza)
const menuOptions = {
    primi: ["Lasagne", "Risotto ai funghi", "Pasta al forno"],
    secondi: ["Arrosto di vitello", "Filetto di orata", "Pollo al curry"],
    dolci: ["Tiramisù", "Panna cotta", "Cheesecake"],
};

const EditReservation = ({ reservations, onEditReservation }) => {
    const { id } = useParams(); // Ottiene l'ID dalla URL
    const navigate = useNavigate();
    const reservationToEdit = reservations.find(r => r.id === Number(id));

    const [formData, setFormData] = useState(null);

    // Imposta lo stato del form con i dati della prenotazione da modificare all'avvio
    useEffect(() => {
        if (reservationToEdit) {
            // Assicura che ci siano tutti i campi, anche per le prenotazioni standard
            setFormData({
                name: reservationToEdit.name || "",
                date: reservationToEdit.date || "",
                time: reservationToEdit.time || "",
                guests: reservationToEdit.guests || 1,
                primo: reservationToEdit.primo || menuOptions.primi[0],
                secondo: reservationToEdit.secondo || menuOptions.secondi[0],
                dolce: reservationToEdit.dolce || menuOptions.dolci[0],
            });
        } else {
            // Se la prenotazione non esiste, reindirizza
            navigate('/');
        }
    }, [reservationToEdit, navigate]);

    if (!formData) {
        return <Typography align="center">Caricamento...</Typography>;
    }

    const isGroupReservation = Number(formData.guests) >= 25;

    const handleChange = (e) => {
        const { name, value } = e.target;
        let guestsValue = name === 'guests' ? Number(value) : formData.guests;

        // Logica di validazione ospiti
        if (name === 'guests') {
            if (guestsValue > 100) {
                alert("Attenzione: Il massimo consentito è 100 ospiti.");
                return;
            }
            if (!isGroupReservation && guestsValue > 25) {
                alert("Attenzione: Prenotazioni superiori a 25 persone devono essere gestite come 'Prenotazioni Gruppi' (min 25).");
                return;
            }
            if (isGroupReservation && guestsValue < 25) {
                 alert("Attenzione: Prenotazioni Gruppi devono avere almeno 25 ospiti.");
                return;
            }
        }
        
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validazione base
        if (!formData.name || !formData.date || formData.guests < 1) {
            alert("Per favore compila tutti i campi richiesti.");
            return;
        }

        if (isGroupReservation && (formData.guests < 25 || formData.guests > 100)) {
            alert("Per le prenotazioni Gruppi, gli ospiti devono essere tra 25 e 100.");
            return;
        }

        const updatedData = {
            id: reservationToEdit.id,
            ...formData,
        };

        // Calcola i dettagli in base al tipo di prenotazione
        if (isGroupReservation) {
            updatedData.table = "Prenotazione Gruppo";
            updatedData.menuDetails = `Menu Fisso: Primo: ${formData.primo}, Secondo: ${formData.secondo}, Dolce: ${formData.dolce}`;
            updatedData.time = ""; // I gruppi non usano l'ora nel form di base
        } else {
            // Per le prenotazioni standard l'ora è richiesta
            if (!formData.time) {
                 alert("Per le prenotazioni standard è richiesta l'ora.");
                 return;
            }
            updatedData.table = "Tavolo Assegnato automaticamente"; // o mantieni il vecchio valore se c'è una logica di assegnazione
            updatedData.menuDetails = "N/A";
            // Rimuovi le proprietà del menu per pulizia
            delete updatedData.primo;
            delete updatedData.secondo;
            delete updatedData.dolce;
        }

        onEditReservation(updatedData);
        
        navigate('/');
        alert(`Prenotazione per ${formData.name} aggiornata con successo!`);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: 'secondary.dark' }}>
                    <EditIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Modifica Prenotazione ({reservationToEdit.name})
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Nome Referente" name="name" value={formData.name} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth label="Data Prenotazione" name="date" type="date" value={formData.date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField 
                                fullWidth 
                                label={`Ospiti (Max ${isGroupReservation ? 100 : 25})`} 
                                name="guests" 
                                type="number" 
                                inputProps={{ min: 1, max: isGroupReservation ? 100 : 25 }} 
                                value={formData.guests} 
                                onChange={handleChange} 
                                required 
                            />
                        </Grid>
                        {!isGroupReservation && (
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
                        )}
                    </Grid>

                    {isGroupReservation && (
                        <>
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
                        </>
                    )}
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 5, py: 1.5 }}
                    >
                        Salva Modifiche
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditReservation;