import React, { useContext, useState, useEffect } from "react";

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

	useEffect(() => {
		// Fetch the list of categories from the backend using fetch
		fetch(process.env.REACT_APP_API_ENDPOINT + "api/categories")
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
			category: category !== null ? category.value : "Category not specified",
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

					console.log("Form data to be submitted");
				} else {
					// Handle error, e.g., show an error message

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
					<hr />
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

				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 col-form-label">
						Description
					</label>
					<hr />
					<textarea
						className="form-control"
						id="description"
						rows="3"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required></textarea>
				</div>
				<div className="col-auto my-1">
					<label className="mr-sm-2 sr-only" htmlFor="category">
						Category
					</label>
					<hr />
					<Select
						options={categories}
						value={category}
						onChange={setCategory}
					/>
					{/* <select
						className="custom-select mr-sm-2 p-2"
						id="category"
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
						<option value="category-1">Category 1</option>
						<option value="category-2">Category 2</option>
						<option value="category-3">Category 3</option>
					</select> */}
				</div>
				<hr />
				<div className="form-check">
					<label className="form-check-label" htmlFor="exampleCheck1">
						Active
					</label>
					<Switch checked={active} onChange={() => setActive(!active)} />
					{/* <input
						type="checkbox"
						className="form-check-input"
						id="checkbox"
						checked={active}
						onChange={(e) => setActive(e.target.checked)}
					/>
					<label className="form-check-label" htmlFor="exampleCheck1">
						Active
					</label> */}
				</div>
				<button type="submit" className="btn btn-primary">
					Create Record
				</button>
			</form>
		</div>
	);
}

export default RecordForm;
