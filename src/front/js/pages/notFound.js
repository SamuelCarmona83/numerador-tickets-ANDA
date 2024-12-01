import React from "react";
import { Link } from "react-router-dom"; 
import notFound from "../../img/error404.png"

export const NotFound = () => {
    return(
        <div className="container text-center celeste">
            <Link to="/">
                <img className="img-fluid w-50 mx-auto" src={notFound} />
            </Link>
            <h1 className="vh-50">Error 404:</h1>
            <h2 className="mt-5">¡Ups! Parece que algo salió mal. La ruta que buscas no existe.</h2>
        </div>
    )
}