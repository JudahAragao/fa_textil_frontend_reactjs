// RoutesControl.js
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NavMenu from '../components/NavMenu';
import MenuSidebar from '../components/MenuSidebar';
import Orcamentos from '../pages/Orcamentos';
import Fabricacao from '../pages/Fabricacao';
import Clientes from '../pages/Clientes';
import Funcionarios from '../pages/Funcionarios';
import PedidosVenda from '../pages/PedidosVenda';
import Produtos from '../pages/Produtos';
import Overlay from '../components/Overlay';
import FormPedido from '../pages/FormPedido';
import { useApiRequestContext } from '../context/ApiRequestContextProvider';
import { AuthProvider } from '../context/AuthContext';

const RoutesControl = () => {

  const {
    modalContent,
    modalIsOpen,
    closeModal
  } = useApiRequestContext()

  const privateView = true

  return <div>

    <Switch>
      <Route exact={true} path="/login" component={Login} />
      {
        privateView && <>
          <AuthProvider>
            <NavMenu />
          </AuthProvider>


          <div style={{ display: 'flex' }}>
            <MenuSidebar />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/fabricacao"
              component={Fabricacao}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/clientes"
              component={Clientes}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/funcionarios"
              component={Funcionarios}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/pedidosvenda"
              component={PedidosVenda}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/orcamento"
              component={Orcamentos}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/produtos"
              component={Produtos}
            />
            <PrivateRoute
              permission="ROLE_ADMIN"
              path="/formpedido"
              component={FormPedido}
            />
          </div>

          <Overlay isOpen={modalIsOpen} onClose={closeModal}>
            {modalContent}
          </Overlay>
        </>
      }
    </Switch>
  </div>
};

export default RoutesControl;
