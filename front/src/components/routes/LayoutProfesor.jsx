import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icono_home from '../../assets/iconos/home.png';

function LayoutProfesor(){
    return (
        <>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
              <img
                  src={icono_home}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                /> {' '}
                Ana Laura Ortega Aguilar
                </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={icono_home}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                /> {' '}
                Listado de cursos
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={icono_home}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Registrar Curso
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br/>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={icono_home}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                /> {' '}
                Cerrar sesión
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      );
    }

export default LayoutProfesor;