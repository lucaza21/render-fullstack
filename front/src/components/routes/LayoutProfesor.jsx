import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icono_perfil from '../../assets/iconos/perfil.png';
import icono_calificar from '../../assets/iconos/aregar.png';
import icono_altaCurso from '../../assets/iconos/registro.png';
import icono_calendario from '../../assets/iconos/calendario.png';
import icono_cursos from '../../assets/iconos/listaCursos.png';
import icono_sesion from '../../assets/iconos/sesion.png';
import styles from '../../styles/layout.module.css';
import useAutorizacion from '../../hooks/useAutorizacion';
import AutorizacionContext from '../../context/AutorizacionContext';
import AltaCurso from '../profesor/AltaCurso';
import Home from '../profesor/HomeProfesor';
import Calendario from '../Calendario';
import ListaCursos from '../profesor/ListaCursos';
import CalificarActividades from '../profesor/CalificarActividades';

function LayoutProfesor() {
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
      <div className="container-fluid" style={{height: "65vh", width: '90vw'}}>
        <div className="row">
          {/*INICIO SECCIÓN MENÚ*/}
          <div className="col-lg-2 border-end ">
            <div className={styles.menu}>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='home'>
                      <img
                        src={icono_perfil}
                        width="30"
                        height="30"
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
                    <Link to='cursos'>
                      <img
                        src={icono_cursos}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Listado de Cursos
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <br />
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='calendario'>
                      <img
                        src={icono_calendario}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Calendario
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <br />
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='altaCurso'>
                      <img
                        src={icono_altaCurso}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Registrar Curso
                    </Link>
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <br />
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>
                    <Link to='calificar'>
                      <img
                        src={icono_calificar}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                      /> {' '}
                      Calificar Actividades
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
                        width="30"
                        height="30"
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
          <div className="col-md-9 contenido">
            <div className={styles.contenido}>
              <Routes>
                <Route
                  path="altaCurso"
                  element={
                    <PrivateRoute>
                      <AltaCurso />
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
                <Route
                  path="calendario"
                  element={
                    <PrivateRoute>
                      <Calendario/>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="cursos"
                  element={
                    <PrivateRoute>
                      <ListaCursos/>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="calificar"
                  element={
                    <PrivateRoute>
                      <CalificarActividades />
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

export default LayoutProfesor;