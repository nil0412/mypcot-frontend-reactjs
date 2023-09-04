import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("male"); // Assuming you have a dropdown for gender

	const [userContext, setUserContext] = useContext(UserContext);

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleRegister = async (e) => {
		e.preventDefault();

		// Check if all required fields are provided
		if (!name || !email || !password || !gender) {
			setError("Please fill in all fields.");
			return;
		}

		try {
			setSuccess(false);
			setError(null);

			// Send a POST request to your backend for registration
			const response = await fetch(
				process.env.REACT_APP_API_ENDPOINT + "api/user/register",
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, password, gender }),
				}
			);

			if (!response.ok) {
				// Handle registration failure
				setError("Registration failed. Please try again.....");
				return;
			}

			// Successful registration
			setSuccess(true);
			setError(null);

			// Reset the form
			setName("");
			setEmail("");
			setPassword("");
			setGender("male");

			const data = await response.json();
			setUserContext((oldValues) => {
				return { ...oldValues, token: data.token };
			});
		} catch (error) {
			console.error("Registration error:", error);
			setError(
				"An error occurred during registration. Please try again later."
			);
		}
	};

	return (
		<div className="back">
			<div className="div-center">
				<div className="content">
					<h3>Register</h3>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
					{success && (
						<div className="alert alert-success" role="alert">
							Registration successful!
						</div>
					)}
					<hr></hr>

					<form onSubmit={handleRegister}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								placeholder="Name"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Email"
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

						<div className="form-group">
							<label htmlFor="gender">Gender</label>
							<select
								className="form-control"
								id="gender"
								name="gender"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								required>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</div>
						<hr></hr>
						<button type="submit" className="btn btn-primary">
							Register
						</button>
						<hr />
						<Link to="/login" class="btn btn-link">
							Go to Login
						</Link>
						<Link to="/" className="btn btn-link">
							Home
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
