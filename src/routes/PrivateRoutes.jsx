import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const { userLogged, hasPermission } = useAuth()
  
  return <Route {...rest} render={(props) => (
    (userLogged().isAuthenticated && hasPermission(permission))
      ? <Component {...props} />
      : <Redirect to={"/login"} />
  )} />
}

export default PrivateRoute;