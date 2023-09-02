import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("male"); // Assuming you have a dropdown for gender

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
			const response = await fetch("http://localhost:8080/api/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password, gender }),
			});
			
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
		} catch (error) {
			console.error("Registration error:", error);
			setError(
				"An error occurred during registration. Please try again later."
			);
		}
	};

	return (
		<div className="container mt-5">
			<h3>Register</h3>
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			{success && (
				<div class="alert alert-success" role="alert">
					Registration successful!
				</div>
			)}

			<form onSubmit={handleRegister}>
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-2 col-form-label">
						Name
					</label>
					<div className="col-sm-10">
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
				</div>

				<div className="form-group row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
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
				</div>

				<div className="form-group row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
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
				</div>

				<div className="col-auto my-1">
					<label className="mr-sm-2 sr-only" htmlFor="gender">
						Gender
					</label>
					<select
						className="custom-select mr-sm-2"
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
				<div className="form-group row">
					<div className="col-sm-10">
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</div>
				</div>
				<hr />
				<button type="button" className="btn btn-link">
					<Link to="/login">Login</Link>
				</button>
			</form>
		</div>
	);
}

export default Register;
