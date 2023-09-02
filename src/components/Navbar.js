import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		// <nav className="navbar navbar-light" style={{backgroundColor: ''#e3f2fd',}}>
		<nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
			<Link to="/" className="navbar-brand" relative="path">
				MyApp
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/" className="nav-link" relative="path">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link" relative="path">
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/register" className="nav-link" relative="path">
							Register
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
