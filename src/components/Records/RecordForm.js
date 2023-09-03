import React, { useState } from "react";

function RecordForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("category-1");
	const [active, setActive] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create a new record object with the form data
		const newRecord = {
			name,
			description,
			category,
			active,
		};

		// Send a POST request to your backend to create the record
		fetch("http://localhost:8000/api/records", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newRecord),
		})
			.then((response) => {
				if (response.ok) {
					// Handle success, e.g., redirect or show a success message
				} else {
					// Handle error, e.g., show an error message
				}
			})
			.catch((error) => {
				// Handle network error
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
					<select
						className="custom-select mr-sm-2 p-2"
						id="category"
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
						<option value="category-1">Category 1</option>
						<option value="category-2">Category 2</option>
						<option value="category-3">Category 3</option>
					</select>
				</div>
				<hr />
				<div className="form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="checkbox"
						checked={active}
						onChange={(e) => setActive(e.target.checked)}
					/>
					<label className="form-check-label" htmlFor="exampleCheck1">
						Active
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Create Record
				</button>
			</form>
		</div>
	);
}

export default RecordForm;
