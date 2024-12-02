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

  const [selectedTime, setSelectedTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  const handleSelect = (index) => {
    setSelectedTime(initialSchedule[index].time);
  };

  const handleReservation = () => {
    setIsReserved(true);
  };

  const handleBackToHome = () => {
    console.log("Volver a la página de inicio");
  };

  if (isReserved) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 m-0">
        <div
          className="card p-3 shadow-lg border-0"
          style={{ maxWidth: "400px" }}
        >
          <img
            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
            alt="Logo ANDA"
            className="d-block mx-auto mb-2"
            style={{ width: "100px" }}
          />
          <h2 className="text-center text-primary h5">
            ¡Reserva realizada con éxito!
          </h2>
          <p className="text-center small">DÍA: 5/12/24</p>
          <p className="text-center small">HORA: {selectedTime}</p>
          <p className="text-center small">ESPECIALIDAD: X</p>
          <button
            onClick={handleBackToHome}
            className="btn btn-outline-primary w-100 mt-2 btn-sm"
          >
            Volver a la página de inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 m-0">
      <div
        className="card p-2 shadow-lg border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo ANDA"
          className="d-block mx-auto mb-2"
          style={{ width: "100px" }}
        />
        <div className="mb-2 text-center text-primary">
          <span className="h6 d-block">Día seleccionado: 5/12/24</span>
          <span className="h6 d-block">Horarios disponibles:</span>
        </div>
        <div className="row row-cols-2 g-1">
          {initialSchedule.map((slot, index) => (
            <div key={slot.time} className="col">
              <div
                className={`d-flex justify-content-between align-items-center border border-primary-subtle rounded px-2 py-1 ${
                  slot.time === selectedTime ? "bg-light" : ""
                }`}
              >
                <span
                  className={`small ${
                    slot.time === selectedTime
                      ? "text-primary fw-bold"
                      : "text-dark"
                  }`}
                >
                  {slot.time}
                </span>
                <button
                  onClick={() => handleSelect(index)}
                  className={`btn btn-sm ${
                    slot.time === selectedTime
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  } rounded-circle`}
                  style={{ width: "30px", height: "30px" }}
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
            className="btn btn-primary w-100 mt-2 btn-sm"
          >
            Reservar
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleSelector;
