import React, { useState } from 'react';
import Login from './Login.jsx';
import RestaurantReservation from './ResturantReservation.jsx';
import './index.css';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        Benvenuto nel sistema di prenotazioni del ristorante
      </h1>

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end items-center bg-white shadow-md rounded-lg p-4">
            <span className="mr-4 font-semibold text-gray-700">
              Utente connesso: {user}
            </span>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
          <RestaurantReservation />
        </div>
      )}
    </div>
  );
}
