import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, permission, isModalOpen, setModalOpen, modalContent, setModalContent, onOpen, onClose, ...rest }) => {
  const { userLogged, hasPermission } = useAuth()
  
  return <Route {...rest} render={(props) => (
    (userLogged().isAuthenticated && hasPermission(permission))
      ? <Component 
          {...props} 
          isModalOpen={isModalOpen} 
          setModalOpen={setModalOpen}
          modalContent={modalContent} 
          setModalContent={setModalContent}
          onOpen={onOpen}
          onClose={onClose}
        />
      : <Redirect to={"/login"} />
  )}/>
}

export default PrivateRoute;