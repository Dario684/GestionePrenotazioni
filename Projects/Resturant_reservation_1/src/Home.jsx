import React from 'react';
import { Container, Box, Typography, Card, CardContent, List, ListItem, ListItemText, Button, Grid, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = ({ reservations, onDelete }) => (
  <Container maxWidth="lg" sx={{ pt: 3, pb: 5 }}>
    <Typography variant="h3" component="h1" align="center" sx={{ mb: 6, fontWeight: 'bold', color: 'text.primary' }}>
      Pannello di Gestione Prenotazioni
    </Typography>

    <Grid container spacing={4}>
      {/* Sezione Informazioni/Contatti */}
      <Grid item xs={12} md={4}>
        <Card elevation={4} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'semibold', borderBottom: '2px solid #3f51b5', pb: 1, color: 'primary.main' }}>
              Contatti:
            </Typography>
            <List disablePadding>
              <ListItem disableGutters>
                <PhoneIcon color="action" sx={{ mr: 1 }} />
                <ListItemText 
                  primary="Numero di telefono:" 
                  secondary="123-456-7890" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              <ListItem disableGutters>
                <EmailIcon color="action" sx={{ mr: 1 }} />
                <ListItemText 
                  primary="Email:" 
                  secondary="info@esempio.com" 
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Sezione Prenotazioni Attive */}
      <Grid item xs={12} md={8}>
        <Card elevation={4} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'semibold', borderBottom: '2px solid #f50057', pb: 1, color: 'error.main' }}>
              <EventNoteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Prenotazioni Attive ({reservations.length})
            </Typography>
            
            {reservations.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 2 }}>Nessuna prenotazione attiva.</Typography>
            ) : (
              <List sx={{ p: 0 }}>
                {reservations.map(({ id, name, date, time, guests, table, menuDetails }) => (
                  <Box key={id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#f5f5f5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {name} - {date} {time ? `alle ${time}` : ''} ({guests} persone)
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {guests >= 25 ? (
                            <Box component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                              {table} - {menuDetails}
                            </Box>
                          ) : (
                            `Assegnato: ${table}`
                          )}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() => onDelete(id)}
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Cancella
                      </Button>
                    </Box>
                  </Box>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

 export default Home;