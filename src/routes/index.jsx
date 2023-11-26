// RoutesControl.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const RoutesControl = () => {
  return (
    <Switch>
      <Route exact={true} path="/login" component={Login} />

      <PrivateRoute permission="ROLE_VENDEDOR" exact={true} path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default RoutesControl;
