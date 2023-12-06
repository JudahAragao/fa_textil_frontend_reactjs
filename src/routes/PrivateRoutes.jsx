import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const { userLogged, hasPermission, /*checkToken*/ } = useAuth()

  // const [validated, setValidated] = useState(async()=>{
  //   try {
  //     const tokenIsValid = await checkToken();
  //     return tokenIsValid;
  //   } catch (error) {
  //     return false;
  //   }
  // });

  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       const tokenIsValid = await checkToken();
  //       setValidated(tokenIsValid);
  //     } catch (error) {
  //       setValidated(false);
  //     }
  //   };
  
  //   validateToken();
  // }, [checkToken]);

  return <Route {...rest} render={(props) => (
    (userLogged().isAuthenticated && hasPermission(permission) /*&& validated*/)
      ? <Component {...props} />
      : <Redirect to={"/login"} />
  )} />
}

export default PrivateRoute;