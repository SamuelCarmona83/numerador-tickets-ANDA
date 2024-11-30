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
      <div className="container my-5 d-flex justify-content-center">
        <div className="card p-4 shadow-lg" style={styles.confirmationCard}>
          <img
            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
            alt="Logo ANDA"
            className="d-block mx-auto mb-3"
            style={{ width: "120px" }}
          />
          <h2 className="text-center text-primary">¡Reserva realizada con éxito!</h2>
          <p className="text-center">DÍA: 5/12/24</p>
          <p className="text-center">HORA: {selectedTime}</p>
          <p className="text-center">ESPECIALIDAD: X</p>
          <button onClick={handleBackToHome} className="btn btn-outline-primary w-100 mt-3">
            Volver a la página de inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={styles.card}>
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo ANDA"
          className="d-block mx-auto mb-3"
          style={{ width: "120px" }}
        />
        <div className="mb-4 text-center text-primary">
          <div>
            <span className="h6">Día seleccionado: 5/12/24</span>
          </div>
          <div>
            <span className="h6">Horarios disponibles:</span>
          </div>
        </div>
        <div className="row g-3">
          {schedule.map((slot, index) => (
            <div key={slot.time} className="col-4">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className={`text-center ${slot.time === selectedTime ? "text-primary" : "text-dark"}`}
                  style={styles.time}
                >
                  {slot.time}
                </span>
                <button
                  onClick={() => handleSelect(index)}
                  className={`btn ${slot.time === selectedTime ? "bg-primary text-white" : "btn-outline-primary"} p-2 rounded-3`}
                  style={{
                    ...styles.checkbox,
                    backgroundColor: slot.time === selectedTime ? "#3865E5" : "transparent",
                    color: slot.time === selectedTime ? "white" : "#3865E5",
                    boxShadow: slot.time === selectedTime ? "0 0 10px rgba(56, 101, 229, 0.5)" : "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {slot.time === selectedTime ? "✓" : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedTime && (
          <button onClick={handleReservation} className="btn btn-primary w-100 mt-3" style={styles.reserveButton}>
            Reservar
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#e9ecef", // Cambiado a gris claro
    borderRadius: "20px",
    boxShadow: "0 0 15px rgba(56, 101, 229, 0.5)",
    border: "none",
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    height: "auto",
    textAlign: "center",
  },
  confirmationCard: {
    backgroundColor: "#e9ecef", // Cambiado a gris claro
    borderRadius: "20px",
    boxShadow: "0 0 25px rgba(56, 101, 229, 0.5)",
    padding: "30px",
    width: "100%",
    textAlign: "center",
  },
  time: {
    fontSize: "14px",
    fontWeight: "500",
  },
  checkbox: {
    width: "40px",
    height: "40px",
    border: "2px solid #3865E5",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    fontSize: "20px",
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
    padding: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reserveButton: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#3865E5",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    boxShadow: "0 4px 8px rgba(56, 101, 229, 0.5)",
  },
};

export default ScheduleSelector;

