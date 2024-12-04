import React from "react";

export const ElegirServicio = () => {

    return(
        <div className="container text-center">
            <select className="mt-3 form-select" aria-label="Default select example">
                <option defaultValue>Seleccione Servicio</option>
                <option value="1">Administrativo</option>
                <option value="2">Médico</option>
                <option value="3">Odontológico</option>
            </select>
            <select className="mt-3 form-select" aria-label="Default select example">
                <option defaultValue>Seleccione Sucursal</option>
                <option value="1">Administrativo</option>
                <option value="2">Médico</option>
                <option value="3">Odontológico</option>
            </select>
        </div>
    )
}