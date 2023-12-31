import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [userContext, setUserContext] = useContext(UserContext)

	const navigate = useNavigate(); // Initialize the useHistory hook

	const [statusCode, setStatusCode] = useState(null);


	const handleLogin = async (e) => {
		e.preventDefault();

		// Check if email and password are provided
		if (!email || !password) {
			setError("Please provide both email and password.");
			return;
		}

		try {
			setError(null);

			// Send a POST request to your backend for authentication
			const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"api/user/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				// Handle authentication failure
				setError("Invalid email or password. Please try again.");
				return;
			
			}

			// const { token } = response.data;
			// // Store the JWT token in localStorage or a secure cookie
			// localStorage.setItem("token", token);

			// Successful login, you can redirect or update the UI as needed
			// For example, you might set a user authentication state

			// Reset the form and error message
			setStatusCode(200);
			setEmail("");
			setPassword("");
			setError(null);
			const data = await response.json();
			setUserContext(oldValues => {
				return { ...oldValues, token: data.token }
			  })
		} catch (error) {
			console.error("Login error:", error);
			setError("An error occurred during login. Please try again later.");
		}
	};

	useEffect(() => {
		// Check the status code and navigate to another page if it's not a failure (e.g., 200)
		if (statusCode === 200) {
			navigate("/records"); // Replace with your target route
		}
	}, [statusCode, navigate]);

	return (
		<div className="back">
			<div className="div-center">
				<div className="content">
					<h3>Login</h3>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
					<hr />
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<label htmlFor="email">Email address</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Password"
							/>
						</div>
						<hr />
						<button type="submit" className="btn btn-primary">
							Login
						</button>
						<hr />
							<Link to="/register" className="btn btn-link">Register new User</Link>
							<Link to="/" className="btn btn-link">Home</Link>
						
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
