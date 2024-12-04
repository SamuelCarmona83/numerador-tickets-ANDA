import React, { useState, useContext } from "react";
import "../../styles/ScheduleSelector.css"; 
import {Context} from "../store/appContext";

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
	const { store } = useContext(Context);

  const handleSelect = (index) => {
    setSelectedTime(schedule[index].time);
  };

  const handleReservation = () => {
    setIsReserved(true);
  };

  const handleBackToHome = () => {
    console.log("Volver a la página de inicio");
  };

  if (isReserved) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div className="card p-4 shadow-lg confirmationCard">
          <img
            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
            alt="Logo ANDA"
            className="d-block mx-auto mb-3"
            style={{ width: "120px" }}
          />
          <h2 className="text-center text-primary">
            ¡Reserva realizada con éxito!
          </h2>
          {store.selectedDate ? (
          <h3>Fecha seleccionada: {store.selectedDate.toLocaleDateString()}</h3>
            ) : (
              <p>No se ha seleccionado ninguna fecha aún.</p>
          )}
          <p className="text-center">HORA: {selectedTime}</p>
          <p className="text-center">ESPECIALIDAD: X</p>
          <button
            onClick={handleBackToHome}
            className="btn btn-outline-primary w-100 mt-3"
          >
            Volver a la página de inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg">
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo ANDA"
          className="d-block mx-auto mb-3"
          style={{ width: "120px" }}
        />
        <div className="mb-4 text-center text-primary">
          <div>
            {store.selectedDate ? (
            <h3>Fecha seleccionada: {store.selectedDate.toLocaleDateString()}</h3>
              ) : (
                <p>No se ha seleccionado ninguna fecha aún.</p>
            )}
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
                  className={`text-center ${
                    slot.time === selectedTime ? "text-primary" : "text-dark"
                  }`}
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {slot.time}
                </span>
                <button
                  onClick={() => handleSelect(index)}
                  className={`btn ${
                    slot.time === selectedTime
                      ? "bg-primary text-white"
                      : "btn-outline-primary"
                  } p-2 rounded-3`}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid #3865E5",
                    borderRadius: "8px",
                    boxShadow:
                      slot.time === selectedTime
                        ? "0 0 10px rgba(56, 101, 229, 0.5)"
                        : "0 2px 5px rgba(0, 0, 0, 0.1)",
                    backgroundColor:
                      slot.time === selectedTime ? "#3865E5" : "transparent",
                    color: slot.time === selectedTime ? "white" : "#3865E5",
                  }}
                >
                  {slot.time === selectedTime ? "✓" : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedTime && (
          <button
            onClick={handleReservation}
            className="btn btn-primary w-100 mt-3 reserveButton"
          >
            Reservar
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleSelector;
