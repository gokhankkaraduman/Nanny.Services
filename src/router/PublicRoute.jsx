import { Navigate } from "react-router";

const isLoggedIn = true;

const PublicRoute = ({Component, to}) => {
    
    return isLoggedIn ? <Navigate to={to}/> : Component;
};

export default PublicRoute;