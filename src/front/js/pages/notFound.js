import React from "react";
import { Link } from "react-router-dom"; 
import notFound from "../../img/error404.png";

export const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center text-center celeste">
            <Link to="/">
                <img className="img-fluid w-50" src={notFound} alt="Error 404" />
            </Link>
            <h1 className="mt-4">Error 404:</h1>
            <h2 className="mt-2">¡Ups! Parece que algo salió mal. La ruta que buscas no existe.</h2>
        </div>
    );
};
