import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const handleLogout = () => {
		if(sessionStorage.getItem("token")){
			sessionStorage.removeItem("token")
		}
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div>
					<Link to="/login">
						<button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
