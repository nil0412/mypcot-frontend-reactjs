import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { toastStyle } from "../Constants";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import Select from "react-select";

export function CardOrForm(props) {
	const [isEditable, setIsEditable] = useState(false);
	const [name, setName] = useState(props.record.name);
	const [description, setDescription] = useState(props.record.description);
	const [category, setCategory] = useState(props.record.category);
	const [categories, setCategories] = useState([]);
	const [active, setActive] = useState(props.record.active);

	const [userContext, setUserContext] = useContext(UserContext);

	const record = props.record;

	const navigate = useNavigate();

	const handleDeleteBtn = async (id) => {
		await fetch(
			`${process.env.REACT_APP_API_ENDPOINT}api/records/delete/${record._id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${userContext.token}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("Success DELETE:", data);

				//Retch updated records
				props.fetchRecords();

				toast.success("record deleted successfully!", toastStyle);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Error while deleting record", toastStyle);
			});
	};

	const handleEdit = () => {
		setIsEditable(true);
	};
	const handleCancelEdit = () => {
		setIsEditable(false);
	};

	const setValuesBeforeSubmit = () => {
		const submitData = {};
		if (name !== "") {
			submitData.name = name;
		}
		if (description !== "") {
			submitData.description = description;
		}
		if (category !== "") {
			submitData.categoty = category;
		}
		if (active !== "") {
			submitData.active = active;
		}
		console.log("submitData: ", submitData);
		return submitData;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const submitData = setValuesBeforeSubmit();
		fetch(
			`${process.env.REACT_APP_API_ENDPOINT}api/records/update/${record._id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${userContext.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitData),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("Success PUT:", data);

				//Retch updated records
				props.fetchRecords();

				setIsEditable(false);
				toast.success("record edited successfully!", toastStyle);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Error while editing record", toastStyle);
			});
	};

	if (isEditable) {
		return (
			<div className="col-sm- my-3">
				<div className="card bg-warning">
					<div className="card-body">
						<h5 className="card-title">
							<p>Name</p>
							<textarea
								value={name}
								onChange={(e) => setName(e.target.value)}
								style={{ width: "80%" }}></textarea>
						</h5>
						<hr></hr>
						<label className="form-check-label mx-3" htmlFor="exampleCheck1">
							Active
						</label>
						<Switch checked={active} onChange={() => setActive(!active)} />
						<hr></hr>
						<p className="card-text">
							Category
							<Select
								options={categories}
								value={category}
								onChange={setCategory}
							/>
						</p>
						<hr></hr>
						<p>
							Description
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								style={{ width: "100%", height: "100px" }}></textarea>
						</p>
						<span className="card-edit-btn m-5 h2" onClick={handleCancelEdit}>
							<i className="fa-solid fa-xmark text-danger"></i>
						</span>
						<span className="card-delete-btn h2" onClick={handleSubmit}>
							<i className="fa-solid fa-check text-success"></i>
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="col-sm- my-3">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{record.name}</h5>
					{active === true ? (
						<span className="card-text text-success">
							<i className="fa-solid fa-circle-dot"></i>
							Active
						</span>
					) : (
						<span className="card-text text-danger">
							<i className="fa-solid fa-circle-dot"></i>
							Inactive
						</span>
					)}

					<span className="card-text mx-5 text-primary">{record.category}</span>

					<hr></hr>
					<p className="card-text">{record.description}</p>
					<span className="card-edit-btn m-5" onClick={handleEdit}>
						<i className="fa-solid fa-pencil"></i>
					</span>
					<span
						className="card-delete-btn"
						onClick={() => handleDeleteBtn(record._id)}>
						<i className="fa-solid fa-trash-can"></i>
					</span>
				</div>
			</div>
		</div>
	);
}
