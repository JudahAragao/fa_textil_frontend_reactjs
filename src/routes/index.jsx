// RoutesControl.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NavMenu from '../components/NavMenu';
import MenuSidebar from '../components/MenuSidebar';

const RoutesControl = () => {

  const privateView = true

  return <div>

    <Switch>
      <Route exact={true} path="/login" component={Login} />
      {
        privateView && <>
          <NavMenu />

          <div style={{ display: 'flex' }}>
            <MenuSidebar />
            <PrivateRoute permission="ROLE_ADMIN" exact={true} path="/dashboard" component={Dashboard} />
          </div>
        </>
      }
    </Switch>
  </div>
};

export default RoutesControl;
