import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icono_perfil from '../../assets/iconos/perfil.png';
import icono_altaUsuario from '../../assets/iconos/usuario.png';
import icono_sesion from '../../assets/iconos/sesion.png';
import styles from '../../styles/layout.module.css';
import useAutorizacion from '../../hooks/useAutorizacion';
import AutorizacionContext from '../../context/AutorizacionContext';
import AltaUsuario from '../admin/AltaUsuario';
import Home from '../admin/HomeAdmin';

function LayoutAdmin() {
  const { logout, loadUser } = useAutorizacion();
  const { user } = AutorizacionContext;
  console.log("usuario" + user);

  const cerrarCesion = () => {
    console.log("entro a cerrar cesion");
    logout();
    loadUser();
  }

  return (
    <>
      <div className="container overflow-hidden text-center" style={{height: "65vh", width: '930vw'}}>
        <div className="row">
          {/*INICIO SECCIÓN MENÚ*/}
          <div className="col-md-3 border-end">
            <div className={styles.menu}>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='home'>
                      <img
                        src={icono_perfil}
                        width="20"
                        height="20"
                        className="d-inline-block align-top"
                        alt="#"
                      /> {' '}
                      Perfil
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <br />
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='alta'>
                      <img
                        src={icono_altaUsuario}
                        width="20"
                        height="20"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Nuevo Usuario
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <br />
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand onClick={() => cerrarCesion()}>
                    <Link to='/login'>
                      <img
                        src={icono_sesion}
                        width="20"
                        height="20"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Cerrar sesión
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
            </div>
          </div>
          {/*FIN SECCIÓN MENÚ*/}

          {/*NAVEGACIÓN COMPONENTES*/}
          <div className="col-md-8 contenido">
            <div className={styles.contenido}>
              <Routes>
                <Route
                  path="alta"
                  element={
                    <PrivateRoute>
                      <AltaUsuario />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="home"
                  element={
                    <PrivateRoute>
                      <Home/>
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="." replace />} />
              </Routes>
            </div>
          </div>
          {/*FIN NAVEGACIÓN COMPONENTES*/}

        </div>
      </div>

    </>
  );
}

export default LayoutAdmin