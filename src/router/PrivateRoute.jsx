
import { Navigate } from "react-router";
const isLoggedIn = false;

const PrivateRoute = ({Component, to}) =>{
    return  isLoggedIn ? <Navigate to={to} /> : Component;

}

export default PrivateRoute;