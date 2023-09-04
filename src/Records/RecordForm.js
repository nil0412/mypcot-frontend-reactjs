import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Switch from "react-switch";
import Select from "react-select";
import { UserContext } from "../Context/UserContext";

function RecordForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	const [active, setActive] = useState(true);

	const [userContext, setUserContext] = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		// Fetch the list of categories from the backend using fetch
		fetch(process.env.REACT_APP_API_ENDPOINT + "api/categories", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${userContext.token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setCategories(
					data.map((category) => ({
						value: category.name,
						label: category.name,
					}))
				);
				setCategories([{ value: "Not Specified", label: "Not Specified" }, ...categories]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create a new record object with the form data
		const newRecord = {
			name,
			description,
			category: category !== null ? category.value : "Not Specified",
			active,
		};

		// Send a POST request to your backend to create the record
		fetch(process.env.REACT_APP_API_ENDPOINT + "api/records", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${userContext.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newRecord),
		})
			.then((response) => {
				if (response.ok) {
					// Handle success, e.g., redirect or show a success message
					navigate("/records");
					console.log("Form data to be submitted");
				} else {
					// Handle error, e.g., show an error message
					setName("");
					setDescription("");
					console.log("Form data NOT submitted");
				}
			})
			.catch((error) => {
				// Handle network error
				console.log("ERROR in Form data submition");
			});
	};

	return (
		<div className="container">
			<h2>Create a New Record</h2>

			<form onSubmit={handleSubmit}>
				<div className="row mb-3">
					<label htmlFor="name" className="col-sm-2 col-form-label">
						Name
					</label>
					<p></p>
					<div className="col-sm-10">
						<input
							type="text"
							className="form-control"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
				</div>
				<hr />
				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 col-form-label">
						Description
					</label>
					<p></p>
					<textarea
						className="form-control"
						id="description"
						rows="3"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required></textarea>
				</div>
				<hr></hr>
				<div className="col-auto my-1">
					<p>
					Category 
					</p>
					<p></p>
					<Select
						id="category"
						options={categories}
						value={category}
						onChange={setCategory}
					/>
				</div>
				<hr />
				<div className="form-check">
					<label className="form-check-label mx-3" htmlFor="exampleCheck1">
						Active
					</label>
					<Switch checked={active} onChange={() => setActive(!active)} />
				</div>
				<hr></hr>
				<button type="submit" className="btn btn-primary">
					Create Record
				</button>
			</form>
		</div>
	);
}

export default RecordForm;
