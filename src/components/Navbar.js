import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Navbar() {
	const [userContext, setUserContext] = useContext(UserContext);

	const logoutHandler = () => {
		fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/logout", {
			credentials: "include",
			// Pass authentication token as bearer token in header
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userContext.token}`,
			},
		}).then(async (response) => {
			setUserContext((oldValues) => {
				return { ...oldValues, details: undefined, token: null };
			});
			window.localStorage.setItem("logout", Date.now());
		});
	};

	return (
		// <nav className="navbar navbar-light" style={{backgroundColor: ''#e3f2fd',}}>
		<nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary sticky-top">
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
						<Link to="/records" className="nav-link" relative="path">
							Records
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/records/create" className="nav-link" relative="path">
							Create_new_records
						</Link>
					</li>
				</ul>
			</div>
			<button onClick={logoutHandler} className="btn btn-primary">
				Logout
			</button>
		</nav>
	);
}

export default Navbar;
