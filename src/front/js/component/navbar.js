import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logoAnda from "../../img/logo_anda.png";
import { fetchUserData } from "./authUtils";

export const Navbar = () => {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const loadUser = async () => {
			try {
				const user = await fetchUserData();
				if (user && user.name) {
					setUsername(user.name);
				} else {
					throw new Error("Usuario no encontrado");
				}
			} catch (error) {
				console.error("Error al cargar el usuario:", error);
				localStorage.removeItem("token");
				navigate("/login"); // Redirige al login si ocurre un error
			}
		};
	
		loadUser();
	}, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
	return (
		<nav className="navbar navbar-light bg-light bg-body-tertiary">
			<div className="container-fluid d-flex justify-content-between align-items-start">
				
				<div className="logo-container">
					<Link to="/" className="logo-link">
						<img className="img-fluid" src={logoAnda} alt="Logo Anda" />
					</Link>
				</div>
				
				<div>
					<span className="me-3">Hola, {username || "Usuario"}</span>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a className="nav-link active" aria-current="page" href="#">
								Mis reservas
							</a>
							<Link to="/editar-perfil">Editar perfil</Link>
							<a onClick={handleLogout} className="nav-link" href="#">
								Cerrar Sesión
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

