import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function SecureRoute(props) {
    const isUserLoggedIn: boolean = useSelector((state: any) => state.user.loginStatus);
    return isUserLoggedIn ? props.children : <Navigate to="/login"/>;   
}
export default SecureRoute;
