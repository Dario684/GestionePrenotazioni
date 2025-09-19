import React, {useState} from 'react';

export default function RestaurantReservation() {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddReservation = (e) => {
    e.preventDefault();

    // Validazione
    if (!formData.name || !formData.date || !formData.time || formData.guests < 1) {
      alert("Per favore compila tutti i campi correttamente");
      return;
    }

    const newReservation = {
      id: Date.now(),
      ...formData,
      guests: Number(formData.guests),
      // Aggiunge un tavolo di default, visto che non c'è una selezione
      table: "Assegnato automaticamente", 
    };

    setReservations((prev) => [...prev, newReservation]);

    // Reset form
    setFormData({
      name: "",
      date: "",
      time: "",
      guests: 1,
    });
  };

  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Prenotazioni Ristorante</h2>

      <div style={{ marginBottom: 20, padding: 20, border: "1px solid #ddd", borderRadius: "8px" }}>
        <form onSubmit={handleAddReservation}>
          <div style={{ marginBottom: 15 }}>
            <label>Nome: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Data: </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Ora: </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Numero persone: </label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button 
            type="submit"
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Aggiungi Prenotazione
          </button>
        </form>
      </div>

      <h3>Lista Prenotazioni ({reservations.length})</h3>
      {reservations.length === 0 ? (
        <p>Nessuna prenotazione presente.</p>
      ) : (
        <div>
          {reservations.map(({ id, name, date, time, guests, table }) => (
            <div
              key={id}
              style={{
                padding: 15,
                border: "1px solid #ccc",
                marginBottom: 10,
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa"
              }}
            >
              <div>
                <strong>{name}</strong> - {date} alle {time} - {guests} {guests === 1 ? 'persona' : 'persone'}
                <br />
                <small>Tavolo: {table}</small>
              </div>
              <button
                onClick={() => handleDelete(id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                Cancella
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
