import React, { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Switch from "react-switch";
import Select from "react-select";
import { toastContainerStyle } from "../Constants";
import { UserContext } from "../Context/UserContext";
import { PageLoading } from "../Pages/PageLoading";
import { CardOrForm } from "../components/CardOrForm";

function RecordList() {
	const [isPageLoading, setIsPageLoading] = useState(true);
	const [records, setRecords] = useState([]);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isNameFilterApplied, setIsNameFilterApplied] = useState(false);

	const [userContext, setUserContext] = useContext(UserContext);

	const options = [
		{ value: "Active", label: "Active" },
		{ value: "Inactive", label: "Inactive" },
		{ value: "No Filter", label: "No Filter" },
	];

	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		fetchRecords();
	}, []);

	const fetchRecords = async () => {
		// Fetch the list of records from your backend when the component mounts
		await fetch(process.env.REACT_APP_API_ENDPOINT + "api/records", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${userContext.token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 401) {
					// Redirect the user to the login page
					window.location.href = "/login";
				}
				return response.json();
			})
			.then((data) => {
				setRecords(data);
				setFilteredRecords(data);
				setIsPageLoading(false);
			})
			.catch((error) => console.error("Error fetching records:", error));
	};

	const handleClearNameFilter = () => {
		setIsPageLoading(true);
		setIsNameFilterApplied(false);
		setFilteredRecords([...records]);
		setIsPageLoading(false);
	}

	const handleSearch = (e) => {
		e.preventDefault();

		setIsPageLoading(true);
		let filteredRecords = records;

		// Apply search query filter
		if (searchQuery.trim() !== "") {
			setIsNameFilterApplied(true);
			const searchResult = filteredRecords.filter((record) =>
			  record.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredRecords([...searchResult]);
		  }

		  setSearchQuery("");
		  setIsPageLoading(false);

	}

	const handleFilter = (selectedOption) => {
		// Filter records based on selected filter options

		let filteredRecords = records;

		if (selectedOption.value === "No Filter") {
			// Show all records
			setFilteredRecords([...records]);
		} else if (selectedOption.value === "Active") {
			// Show only active records
			filteredRecords = records.filter((record) => record.active);
			setFilteredRecords([...filteredRecords]);
		} else {
			// Show only inactive records
			filteredRecords = records.filter((record) => !record.active);
			setFilteredRecords([...filteredRecords]);
		}

		setIsPageLoading(false);
	};

	const handleChange = (selectedOption) => {
		setIsPageLoading(true);
		setSelectedOption(selectedOption);
		handleFilter(selectedOption);
	};

	if (isPageLoading) {
		return <PageLoading />;
	}

	return (
		<div className="page-container position-relative">
			<ToastContainer style={toastContainerStyle} />
			<div className="sort-div-container position-fixed bg-warning text-dark p-2">
				<div>
					<form className="form-inline">
						<input
							className="searchBox"
							type="text"
							id="searchBox"
							placeholder="Enter record name"
							name="searchBox"
							value={searchQuery}
              				onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button type="submit" className="btn btn-outline-success mx-2" onClick={ (e) => {handleSearch(e)}}>
							Submit
						</button>
					</form>
				</div>
				<div className="d-inline">
					<Select
						defaultValue={selectedOption}
						value={selectedOption}
						onChange={handleChange}
						options={options}
					/>
				</div>
			</div>
			{isNameFilterApplied ? <div className="position-fixed namedFilter bg-danger text-white"> <button type="button" class="btn btn-danger" onClick={handleClearNameFilter}>Clear Record_Name_Filter</button> </div> : null}
			<div className="products-container">
				<div className="row m-5">
				{isNameFilterApplied ?
					<p className="m-5"></p> : null}
					{filteredRecords.map((record) => (
						<CardOrForm
							key={`record-${record._id}`}
							record={record}
							fetchRecords={fetchRecords}
						/>
					))}
					{filteredRecords.length === 0 ? <div>No items to show!!!</div> : null}
				</div>
			</div>
		</div>
	);
}

export default RecordList;
