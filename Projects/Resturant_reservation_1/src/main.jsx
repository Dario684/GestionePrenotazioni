import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import App from './App';

// Puoi personalizzare il tema qui (colori, font, ecc.)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blu standard di MUI
    },
    secondary: {
      main: '#9c27b0', // Viola
    },
    success: {
        main: '#4caf50', // Verde
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);