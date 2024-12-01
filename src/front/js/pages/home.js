import React from "react";
import { Link } from "react-router-dom"; 
import logoAnda from "../../img/logo_anda.png";

export const Home = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="img-fluid w-50 mx-auto" src={logoAnda} alt="Logo Anda" />
                        <div className="card-body">
                            <h5 className="card-title">Agenda servicio #</h5>
                            <p className="card-text">Resumen de datos de agenda. Poner día / hora / sucursal.</p>
                            <p className="card-text">Poner una vista de imprimir que lo centre en el medio de la página y le saque el navbar.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <button type="button" className="btn celeste">
                        <Link to="/elegir-servicio">Agende una nueva reserva</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
