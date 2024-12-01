import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate para la redireccion

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setSuccessMessage("");  // Limpiar el mensaje de exito si hay error
    } else {
      // Aca va la logica para actualizar la contraseña (API o llamada al backend)

      setSuccessMessage("Contraseña modificada con éxito.");
      setErrorMessage(""); 

      // Limpia los campos de entrada
      setNewPassword("");
      setConfirmPassword("");

      // Redirige al inicio
      setTimeout(() => {
        navigate("/");  // Redirige a la ruta deseada
      }, 2000); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Cambiar Contraseña</h2>

        
        {successMessage && (
          <div style={{ color: "green", marginBottom: "10px" }} className="alert alert-success">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }} className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        {/* Formulario de cambio de contraseña */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Introduce nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirma la nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Confirmar Cambio</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
