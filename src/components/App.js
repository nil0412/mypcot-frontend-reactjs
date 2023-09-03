import React, {useCallback, useContext, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import Loader from "./Loader"
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
import { UserContext } from "./Context/UserContext";
import Welcome from "./Welcome";

function App() {
	// Simulated authentication state
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userContext, setUserContext] = useContext(UserContext)

	const handleLogin = () => {
		// Simulate a successful login
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Simulate a logout
		setIsLoggedIn(false);
	};

	const verifyUser = useCallback(() => {
		fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/refreshToken", {
		  method: "POST",
		  credentials: "include",
		  headers: { "Content-Type": "application/json" },
		}).then(async response => {
		  if (response.ok) {
			const data = await response.json()
			setUserContext(oldValues => {
			  return { ...oldValues, token: data.token }
			})
		  } else {
			setUserContext(oldValues => {
			  return { ...oldValues, token: null }
			})
		  }
		  // call refreshToken every 5 minutes to renew the authentication token.
		  setTimeout(verifyUser, 5 * 60 * 1000)
		})
	  }, [setUserContext])
	
	  useEffect(() => {
		verifyUser()
	  }, [verifyUser])

	   /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

	  
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
						
						{/* <Route path="/" element={<Home />} /> */}
						<Route path="/" element={<Welcome />} />
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
