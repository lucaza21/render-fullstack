import React, { Fragment } from 'react'
import { Journals, FilePlay, FolderFill, JournalBookmarkFill, FileArrowUp } from 'react-bootstrap-icons'
import ContentCalificacion from './ContentCalificacion'
import { Link } from 'react-router-dom'
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';

function ContentList({entregasPorProfesor, handleUrl} ) {
  return (
    <Fragment>
      {/*<!-- Sidebar - Brand -->*/}
      {entregasPorProfesor == null ? (
        <div>SideBar</div>
      ) : (
        <>
          {entregasPorProfesor.map((profesor) => (
            <Accordion>
            <Card key={profesor.id_profesor}>
              {/* <h2>{profesor.nombre}</h2> */}
              
              {profesor.cat_cursos.map((curso) => (
                <div key={curso.id_curso}>
                  <hr className="sidebar-divider" />
                  <Accordion.Item eventKey={curso.titulo}>
                  <Accordion.Header>
                    <div className="d-flex flex-column align-items-center justify-content-between">
                      <div className="">
                        <JournalBookmarkFill size={20} />
                      </div>
                        <div className="">
                          <h3>{curso.titulo}</h3>
                        </div>
                    </div>
                    </Accordion.Header>
                    {curso.modulos.length > 0 ? (
                      curso.modulos.map((modulo) => (
                        <Accordion.Body>
                        <div key={modulo.id_modulo}>
                          <div className="d-flex align-items-center justify-content-end">
                            <div className="">
                              <h4>{modulo.nombre_modulo}</h4>
                            </div>
                          </div>
                          {modulo.actividades.length > 0 ? (
                            modulo.actividades.map((actividad) => (
                              <div key={actividad.id_actividad}>
                              <Card className='my-2'>
                              <Card.Header className='bg-secondary text-white'>
                                <div className="d-flex align-items-center justify-content-end">
                                  <h5>{actividad.nombre_actividad}</h5>
                                </div>
                                </Card.Header>
                                {actividad.entrega_actividades &&
                                actividad.entrega_actividades.length > 0 ? (
                                  <div>
                                    {/* Mostrar la última entrega de cada alumno */}
                                    {actividad.entrega_actividades
                                      .reduce((acc, entrega) => {
                                        const existing = acc.find(
                                          (item) => item.id_alumno === entrega.id_alumno
                                        );
                                        if (!existing || existing.fecha_entrega < entrega.fecha_entrega) {
                                          return [entrega, ...acc.filter((item) => item.id_alumno !== entrega.id_alumno)];
                                        }
                                        return acc;
                                      }, [])
                                      .map((entrega) => (
                                        <div key={entrega.id_entrega}>
                                          {entrega.ruta_entrega.length > 0 ? (
                                            <Card.Body >
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="">
                                                <FolderFill size={20} />
                                              </div>
                                              <div className="">
                                                <button onClick={() => handleUrl(entrega.ruta_entrega[0].url)}>
                                                  {entrega.ruta_entrega[0].fName}
                                                </button>
                                              </div>
                                            </div>
                                            </Card.Body>
                                          ) : (
                                            <p>No hay ruta de entrega para esta actividad.</p>
                                            
                                          )}
                                          <ListGroup className="list-group-flush">
                                          <div className="fs-6">{entrega.comentario_entrega}</div>
                                          <div className="fs-6">Entregado el {new Date(entrega.fecha_entrega).toLocaleDateString()}:</div>
                                            {/* No mostrar el botón si la entrega ya fue calificada */}
                                            {!entrega.calificaciones && (
                                              <Link to={`/notas/${entrega.id_entrega}`}>
                                                <div className="d-flex align-items-center justify-content-center">
                                                  <button className="btn btn-primary">
                                                    Calificar Entrega {entrega.id_entrega}
                                                  </button>
                                                </div>

                                              </Link>
                                            )}
                                            
                                            <ListGroup.Item><hr className="border-1"></hr></ListGroup.Item>
                                          </ListGroup>
                                        </div>
                                        
                                      ))}
                                  </div>
                                ) : (
                                  <p>No hay entregas para esta actividad.</p>
                                )}
                                </Card>
                              </div>
                              
                            ))
                          ) : (
                            <p>No hay actividades para este módulo.</p>
                          )}
                        </div>
                        </Accordion.Body>
                      ))
                    ) : (
                      <p>No hay módulos para este curso.</p>
                    )}
                  </Accordion.Item>
                </div>
                
              ))}
  
            </Card>
            </Accordion>
          ))}
        </>
      )}
    </Fragment>
  );
}
export default ContentList