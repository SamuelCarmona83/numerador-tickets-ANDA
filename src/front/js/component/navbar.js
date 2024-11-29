import React from "react";
import { Link } from "react-router-dom";
import logoAnda from "../../img/logo_anda.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
				<img className="img-fluid mw-20" src={logoAnda} />
				</Link>
				<div className="ml-auto">
					
				</div>
			</div>
		</nav>
	);
};
