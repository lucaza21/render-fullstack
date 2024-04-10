import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { JournalBookmarkFill } from 'react-bootstrap-icons'

function NameCurses({ alumno }) {

    const [cursos, setCursos] = useState([]);

    const loadCursos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/calificaciones/${alumno.id}`);
            const data = await response.json();
            setCursos(data);
        } catch (error) {
            console.log(`Error al obtener los datos: ${error}`);
        }
    };

    useEffect(() => {
        loadCursos();
    }, []);

    const calcularPromedioModulosPorCurso = () => {
        const promediosPorCurso = {};

    cursos.forEach(curso => {
        let totalCalificaciones = 0;
        let numActividadesCalificadas = 0;

        curso.modulos.forEach(modulo => {
            modulo.actividades.forEach(actividad => {
                // Obtener la última entrega con calificación de la actividad
                const ultimaEntregaConCalificacion = actividad.entrega_actividades
                    .filter(entrega => entrega.calificaciones && entrega.calificaciones.calificacion !== null)
                    .pop();

                if (ultimaEntregaConCalificacion) {
                    totalCalificaciones += ultimaEntregaConCalificacion.calificaciones.calificacion;
                    numActividadesCalificadas++;
                }
            });
        });

        const promedioCurso = numActividadesCalificadas !== 0 ? totalCalificaciones / numActividadesCalificadas : 0;
        promediosPorCurso[curso.id_curso] = promedioCurso;
    });

    return promediosPorCurso;
};

  return (
    <>
         {cursos ? (
                <>
                    <Link to="/cursos"> Volver al listado de cursos </Link>
                    <div className='overflow-y-scroll container' style={{ height: "65vh", width: '930px' }}>
                        {cursos.map(curso => (
                            <div key={curso.id_curso} >
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className=""><h3>{curso.titulo}</h3></div>
                                    <div className=""><JournalBookmarkFill size={20} /></div>
                                </div>
                                {/* {curso.modulos.map(modulo => (
                                    <div key={modulo.id_modulo}>
                                        {modulo.actividades.map(actividad => (
                                        <>
                                            <div key={actividad.id_actividad}>
                                                <div className='d-flex align-items-center justify-content-end'>
                                                    <div className=""><h4>{modulo.nombre_modulo}</h4></div>
                                                </div>
                                                {actividad.entrega_actividades && actividad.entrega_actividades.map(entrega => (
                                                    <>
                                                        {entrega.calificaciones && (
                                                            <div className='d-flex align-items-center justify-content-end'>
                                                                <div className=""><p>Nota: {actividad.nombre_actividad}: {entrega.calificaciones.calificacion}</p></div>
                                                            </div>
                                                        )}
                                                    </>
                                                ))}
                                            </div>
                                        </>
                                    ))}
                                    </div>
                                ))} */}
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
                                                        {/* Filtrar las entregas para mostrar solo la última calificada */}
                                                        {actividad.entrega_actividades
                                                            .filter(entrega => entrega.calificaciones && entrega.calificaciones.calificacion !== null)
                                                            .slice(-1) // Obtener la última entrega
                                                            .map(entrega => (
                                                                <div key={entrega.id_entrega}>
                                                                    <div className='d-flex align-items-center justify-content-end'>
                                                                        <div className=""><p>Nota: {actividad.nombre_actividad}: {entrega.calificaciones.calificacion}</p></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <p>Promedio del Curso: {calcularPromedioModulosPorCurso()[curso.id_curso].toFixed(2)}</p>
                                <Link to={`/cursosDetail/${curso.id_curso}`}>Ver Curso</Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <> Cargando..</>
            )}
    </>
  )
}

export default NameCurses