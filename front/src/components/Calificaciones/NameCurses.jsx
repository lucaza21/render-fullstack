import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { JournalBookmarkFill } from 'react-bootstrap-icons'
import { Accordion, Button, Card } from 'react-bootstrap';

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
    <div>
    {cursos ? (
        <>
            {/* <Link to="/cursos" className="btn btn-primary mb-3">Volver al listado de cursos</Link> */}
            <Accordion>
                {cursos.map(curso => (
                    <Card key={curso.id_curso}>
                        <Accordion.Item eventKey={curso.id_curso}>
                            <Accordion.Header>
                                <h3 className="card-title">{curso.titulo}</h3>
                                <JournalBookmarkFill size={20} />
                            </Accordion.Header>
                            <Accordion.Body>
                                {curso.modulos.map(modulo => (
                                    <div key={modulo.id_modulo} className="card mb-3">
                                        <div className="card-header bg-info text-white">{modulo.nombre_modulo}</div>
                                        <div className="card-body">
                                            {modulo.actividades.map(actividad => (
                                                <div key={actividad.id_actividad} className="card mb-3">
                                                    <div className="card-header bg-secondary text-white">{actividad.nombre_actividad}</div>
                                                    <div className="card-body">
                                                        {actividad.entrega_actividades && actividad.entrega_actividades.length > 0 && (
                                                            <div className="bg-light p-3 rounded">
                                                                {actividad.entrega_actividades
                                                                    .filter(entrega => entrega.calificaciones && entrega.calificaciones.calificacion !== null)
                                                                    .slice(-1)
                                                                    .map(entrega => (
                                                                        <p key={entrega.id_entrega} className="bg-light rounded p-2">Nota: {actividad.nombre_actividad}: {entrega.calificaciones.calificacion}</p>
                                                                    ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="card-footer bg-light">Promedio del Curso: {calcularPromedioModulosPorCurso()[curso.id_curso].toFixed(2)}</div>
                                <Link to={`/cursosDetail/${curso.id_curso}`} className="btn btn-primary">Ver Curso</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>
                ))}
            </Accordion>
        </>
    ) : (
        <div>Cargando...</div>
    )}
</div>
);
}


export default NameCurses