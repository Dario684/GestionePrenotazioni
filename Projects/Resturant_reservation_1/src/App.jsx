import React, { useState } from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

// Componente per la pagina di login
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica di verifica semplificata per l'esempio
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      alert("Per favore inserisci nome utente e password.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Accedi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Utente:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
        >
          Accedi
        </button>
      </form>
    </div>
  );
};

// Componente Prenotazione Tavoli (Standard)
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
      alert("Attenzione: Prenotazioni superiori a 25 persone devono essere gestite come 'Prenotazioni Gruppi' con menù. Seleziona la pagina 'Gruppi' nel menu.");
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
    onAddReservation(formData); // Aggiunge la prenotazione (passa solo i dati del form)
    navigate('/'); // Torna alla home
    alert(`Prenotazione per ${formData.name} confermata per il ${formData.date}!`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prenotazioni Tavolo Standard (max 25 persone)</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ora:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ospiti (max 25):</label>
            <input type="number" name="guests" min="1" max="25" value={formData.guests} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300">
          Conferma Prenotazione
        </button>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------------------------------------
// Componente AGGIUNTO/MODIFICATO: Prenotazione Gruppi con Menù
// ---------------------------------------------------------------------------------------------------
const Groups = ({ onAddReservation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    guests: 25, // Inizia con il minimo per i gruppi
    primo: "Lasagne",
    secondo: "Arrosto di vitello",
    dolce: "Tiramisù",
  });

  // Lista di opzioni per il menù
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

    // Costruisci il dettaglio del menù da passare alla funzione di aggiunta
    const menuDetails = `Menu Fisso: Primo: ${formData.primo}, Secondo: ${formData.secondo}, Dolce: ${formData.dolce}`;

    // Passa i dati del form e i dettagli del menù (come secondo parametro)
    onAddReservation(formData, menuDetails);
    
    navigate('/'); // Torna alla home
    alert(`Prenotazione GRUPPO per ${formData.name} confermata per il ${formData.date}!`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Prenotazione Gruppi (25-100 Persone)</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-indigo-300 rounded-lg">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Gruppo/Referente:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Prenotazione:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Ospiti (min 25, max 100):</label>
          <input type="number" name="guests" min="25" max="100" value={formData.guests} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        {/* Selezione Menù */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-indigo-700">Selezione Menù Fisso</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Primo Piatto:</label>
            <select name="primo" value={formData.primo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
              {menuOptions.primi.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondo Piatto:</label>
            <select name="secondo" value={formData.secondo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
              {menuOptions.secondi.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Dolce:</label>
            <select name="dolce" value={formData.dolce} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
              {menuOptions.dolci.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition duration-300">
          Conferma Prenotazione Gruppo
        </button>
      </form>
    </div>
  );
};


// ---------------------------------------------------------------------------------------------------
// Componente MODIFICATO: Home che mostra le prenotazioni
// ---------------------------------------------------------------------------------------------------
const Home = ({ reservations, onDelete }) => (
  <div className="p-4">
    <h1 className="text-3xl font-bold text-center my-6 text-indigo-700">Informazioni</h1>
    <h2 className="text-2xl font-semibold mt-8 mb-3 border-b-2 border-indigo-400 pb-1 text-indigo-600">Contatti: </h2>
    <div className="space-y-2">
      <p className="text-lg text-gray-700 flex items-center">
        <span className="font-medium w-36 text-indigo-500">Numero di telefono:</span> 
        <span className="ml-2">123-456-7890</span> 
      </p>
      
      <p className="text-lg text-gray-700 flex items-center">
        <span className="font-medium w-36 text-indigo-500">Email:</span> 
        <span className="ml-2">info@esempio.com</span> 
      </p>
    </div>
    <h3 className="text-xl font-semibold mt-8 mb-4">Prenotazioni Attive ({reservations.length})</h3>
    {reservations.length === 0 ? (
      <p className="text-gray-500">Nessuna prenotazione attiva.</p>
    ) : (
      <div className="space-y-2">
        {reservations.map(({ id, name, date, time, guests, table, menuDetails }) => ( // Aggiunto menuDetails
          <div key={id} className="p-3 border border-blue-200 bg-blue-50 rounded-md flex flex-wrap justify-between items-center">
            <div>
              <strong>{name}</strong> - {date} {time ? `alle ${time}` : ''} ({guests} persone)
              <br/>
              <span className="text-sm text-gray-600">
                {guests >= 25 ? (
                  <span className="font-bold text-indigo-700">{table}</span> - {menuDetails} 
                ) : (
                  `Assegnato: ${table}`
                )}
              </span>
            </div>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm mt-2 md:mt-0"
            >
              Cancella
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Componente NavBar (visibile solo a utente loggato)
const NavBar = () => (
  <nav className="flex justify-center space-x-4 p-4 bg-white shadow-md rounded-b-lg">
    <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
      Home
    </Link>
    <Link to="/tavoli" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
      Prenotazione Tavoli
    </Link>
    <Link to="/Groups" className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
      Prenotazione Gruppi
    </Link>
  </nav>
);

// ---------------------------------------------------------------------------------------------------
// Componente MODIFICATO: App principale
// ---------------------------------------------------------------------------------------------------
export default function App() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Funzione unificata per aggiungere prenotazioni, gestisce anche i dettagli di gruppo
  const handleAddReservation = (formData, details = "Tavolo Assegnato automaticamente") => { 
    const isGroup = Number(formData.guests) >= 25;
    
    const newReservation = {
      id: Date.now(),
      ...formData,
      // Se è un gruppo, usiamo un nome fisso e salviamo i dettagli del menù
      table: isGroup ? "Prenotazione Gruppo" : details, 
      menuDetails: isGroup ? details : "N/A", // 'details' contiene il menù se è un gruppo
      guests: Number(formData.guests),
    };
    setReservations((prev) => [...prev, newReservation]);
    return newReservation.id;
  };
  
  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 my-6">
          Benvenuto nel sistema di prenotazioni del ristorante
        </h1>
      </div>
      
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="space-y-6">
          <NavBar />
          
          <div className="p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Home reservations={reservations} onDelete={handleDelete} />} />
              <Route path="/tavoli" element={<RestaurantReservation onAddReservation={handleAddReservation} />} />
              {/* Route AGGIORNATA: Passa onAddReservation al componente Groups */}
              <Route path="/Groups" element={<Groups onAddReservation={handleAddReservation} />} /> 
            </Routes>
          </div>
          
          <div className="max-w-2xl mx-auto flex justify-end items-center bg-white shadow-md rounded-lg p-4">
            <span className="mr-4 font-semibold text-gray-700">
              Utente connesso: {user}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}