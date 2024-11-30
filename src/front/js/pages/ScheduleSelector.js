import React, { useState } from "react";

const ScheduleSelector = () => {
  const initialSchedule = [
    { time: "8:00", available: true },
    { time: "8:30", available: true },
    { time: "9:00", available: true },
    { time: "9:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
  ];

  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  const handleSelect = (index) => {
    setSelectedTime(schedule[index].time);
  };

  const handleReservation = () => {
    setIsReserved(true);
  };

  const handleBackToHome = () => {
    // Volver a la pagina de inicio no esta definido aun...
    console.log("Volver a la página de inicio");
  };

  if (isReserved) {
    return (
      <div style={styles.confirmationContainer}>
        <div style={styles.confirmationCard}>
          <img
            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
            alt="Logo ANDA"
            style={styles.logoAnda}
          />
          <h2 style={styles.successMessage}>¡Reserva realizada con éxito!</h2>
          <p style={styles.details}>DÍA: 5/12/24</p>
          <p style={styles.details}>HORA: {selectedTime}</p>
          <p style={styles.details}>ESPECIALIDAD: X</p>
          <button onClick={handleBackToHome} style={styles.backButton}>
            Volver a la página de inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <img
        src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
        alt="Logo ANDA"
        style={styles.logoAnda}
      />
      <div style={styles.header}>
        <div>
          <span style={styles.headerText}>Día seleccionado: 5/12/24</span>
        </div>
        <div>
          <span style={styles.headerText}>Horarios disponibles:</span>
        </div>
      </div>
      <div style={styles.grid}>
        {schedule.map((slot, index) => (
          <div key={slot.time} style={styles.slotContainer}>
            <span
              style={{
                ...styles.time,
                color: slot.time === selectedTime ? "#3865E5" : "black",
              }}
            >
              {slot.time}
            </span>
            <button
              onClick={() => handleSelect(index)}
              style={{
                ...styles.checkbox,
                backgroundColor: slot.time === selectedTime ? "#3865E5" : "white",
                color: slot.time === selectedTime ? "white" : "#3865E5",
                boxShadow: slot.time === selectedTime ? "0 0 10px rgba(56, 101, 229, 0.5)" : "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {slot.time === selectedTime ? "✓" : ""}
            </button>
          </div>
        ))}
      </div>
      {selectedTime && (
        <button onClick={handleReservation} style={styles.reserveButton}>
          Reservar
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "350px",
    margin: "50px auto",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    height: "auto",
  },
  logoAnda: {
    display: "block",
    width: "120px",
    margin: "auto",
    marginBottom: "15px",
  },
  header: {
    marginBottom: "15px",
    color: "#3865E5",
    fontSize: "12px",
  },
  headerText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    padding: "10px",
  },
  slotContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  time: {
    fontSize: "12px",
  },
  checkbox: {
    border: "2px solid #3865E5",
    borderRadius: "5px",
    padding: "8px",
    cursor: "pointer",
    width: "28px",
    height: "28px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transform: "scale(1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "box-shadow 0.3s ease",
  },
  reserveButton: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#3865E5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(56, 101, 229, 0.2)",
  },
  confirmationContainer: {
    fontFamily: "'Roboto', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "350px",
    margin: "50px auto",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    overflow: "hidden",
    height: "auto",
  },
  confirmationCard: {
    backgroundColor: "#e9e9e9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    textAlign: "center",
  },
  successMessage: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#3865E5",
    marginBottom: "10px",
  },
  details: {
    fontSize: "14px",
    color: "#555",
    margin: "8px 0",
  },
  backButton: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#3865E5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ScheduleSelector;
