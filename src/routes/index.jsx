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

const RoutesControl = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  const privateView = true

  return <div>

    <Switch>
      <Route exact={true} path="/login" component={Login} />
      {
        privateView && <>
          <NavMenu />

          <div style={{ display: 'flex' }}>
            <MenuSidebar />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/fabricacao"
              component={Fabricacao}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/clientes"
              component={Clientes}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/funcionarios"
              component={Funcionarios}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/pedidosvenda"
              component={PedidosVenda}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/orcamento"
              component={Orcamentos}
            />
            <PrivateRoute
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              permission="ROLE_ADMIN"
              exact={true}
              path="/produtos"
              component={Produtos}
            />
          </div>

          <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
            {modalContent}
          </Overlay>
        </>
      }
    </Switch>
  </div>
};

export default RoutesControl;
