import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="container">
			<div className="home-page">
				<h1>Welcome to Your App</h1>
				<div className="options">
					<Link to="/register" className="option">
						Register
					</Link>
					<br />
					<Link to="/login" className="option">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
