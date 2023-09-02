import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RecordList from "./Records/RecordList";
import RecordForm from "./Records/RecordForm";
import CategoryList from "./Categories/CategoryList";
import CategoryForm from "./Categories/CategoryForm";
import SingleRecord from "./Records/SingleRecord";
import Layout from "./Layout";
import PrivateRoutes from "./PrivateRoutes";

function App() {
	// Simulated authentication state
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		// Simulate a successful login
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Simulate a logout
		setIsLoggedIn(false);
	};

	return (
		<Router>
			<Layout>
				{/* Add navigation or header here if needed */}
				<Routes>
					{/* Public Routes */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Private Routes (require authentication) */}
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<Home />} />
						<Route path="/records" element={<RecordList />} />
						<Route path="/records/:id" element={<SingleRecord />} />
						<Route path="/records/create" element={<RecordForm />} />
						<Route path="/records/edit/:id" element={<RecordForm />} />
						<Route path="/categories" element={<CategoryList />} />
						<Route path="/categories/create" element={<CategoryForm />} />
					</Route>

					{/* Add more routes as needed */}
					{/* </Route> */}
				</Routes>

				{isLoggedIn && <button onClick={handleLogout}>Logout</button>}
			</Layout>
		</Router>
	);
}

export default App;
