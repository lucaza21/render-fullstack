import React, { Fragment } from 'react'
import { Journals, FilePlay, FolderFill, JournalBookmarkFill, FileArrowUp } from 'react-bootstrap-icons'
import ContentCalificacion from './ContentCalificacion'
import { Link } from 'react-router-dom'
function ContentList({entregasPorProfesor, handleUrl} ) {
  return (
    <Fragment>
            {entregasPorProfesor && entregasPorProfesor.map(profesor => (
                <div key={profesor.id_profesor}>
                    {profesor.cat_cursos.map(curso => (
                        <div key={curso.id_curso}>
                            <hr className="sidebar-divider" />
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className=""><h3>{curso.titulo}</h3></div>
                                <div className=""><JournalBookmarkFill size={20} /></div>
                            </div>
                            {curso.modulos.map(modulo => (
                                <div key={modulo.id_modulo}>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <div className=""><h4>{modulo.nombre_modulo}</h4></div>
                                    </div>
                                    {modulo.actividades.map(actividad => (
                                        <div key={actividad.id_actividad}>
                                            <div className='d-flex align-items-center justify-content-end'>
                                                <h5>{actividad.nombre_actividad}</h5>
                                            </div>
                                            {actividad.entrega_actividades && actividad.entrega_actividades.length > 0 && (
                                                <div>
                                                    {actividad.entrega_actividades
                                                        .slice(-1) // Obtener solo la última entrega
                                                        .map(entrega => (
                                                            <div key={entrega.id_entrega}>
                                                                {entrega.ruta_entrega.length > 0 ? (
                                                                    <div className='d-flex align-items-center justify-content-between'>
                                                                        <div className=""><FolderFill size={20} /></div>
                                                                        <div className=""><button onClick={() => handleUrl(entrega.ruta_entrega[0].url)}>{entrega.ruta_entrega[0].fName}</button></div>
                                                                    </div>
                                                                ) : (
                                                                    <p>No hay ruta de entrega para esta actividad.</p>
                                                                )}
                                                                <div className="fs-6">{entrega.comentario_entrega}</div>
                                                                <div className="fs-6">Entregado el {new Date(entrega.fecha_entrega).toLocaleDateString()}:</div>
                                                                <Link to={`/notas/${entrega.id_entrega}`}>
                                                                    <div className='d-flex align-items-center justify-content-center'>
                                                                        <button className="btn btn-primary">Calificar Entrega {entrega.id_entrega}</button>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
  )
}
export default ContentList