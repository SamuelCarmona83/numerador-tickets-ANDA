import React from "react";
import EditProfile from "../component/editProfile"; // Importar el componente EditProfile

export const Home = () => {
    return (
        <div className="text-center mt-5">
            
            
            {/* Formulario de edición de perfil */}
            <EditProfile />
        </div>
    );
};
