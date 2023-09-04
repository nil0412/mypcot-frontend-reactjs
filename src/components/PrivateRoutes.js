import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../Context/UserContext";
const PrivateRoutes = () => {

	
	const [userContext, setUserContext] = useContext(UserContext)

	// const isAuthenticated = !!localStorage.getItem("token");
	const isAuthenticated = !!userContext.token;
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;