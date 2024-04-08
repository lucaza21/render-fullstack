import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { JournalBookmarkFill } from 'react-bootstrap-icons'

function NameCurses({ alumno }) {

    const [cursos, setCursos] = useState([])

    const loadCursos = async () =>{
        console.log(`%c trayendo info de ${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/${alumno.id}`, 'color:green');
        try {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/calificaciones/${alumno.id}`)
            .then (response => response.json())
            .then (result => setCursos(result))
        } catch (error){
            console.log(`Error al obtener los datos: %c${error}`, 'color:yellow')
      }
    };
  
    useEffect(() => {
      try{
        loadCursos()
      }
      catch (error){
        console.log(`%c${error}`, 'color:yellow')
    }
      
    }, []);

    const calcularPromedioModulosPorCurso = () => {
        const promediosPorCurso = {};

        cursos.forEach(curso => {
            let totalModulos = 0;
            let totalPromedioModulos = 0;
            let numModulosConActividadesCalificadas = 0;

            curso.modulos.forEach(modulo => {
                let totalCalificaciones = 0;
                let numActividades = 0;

                modulo.actividades.forEach(actividad => {
                    if (actividad.entrega_actividades.calificaciones && actividad.entrega_actividades.calificaciones.calificacion !== null) {
                        totalCalificaciones += actividad.entrega_actividades.calificaciones.calificacion;
                        numActividades++;
                    }
                });

                if (numActividades !== 0) {
                    totalModulos++;
                    const promedioModulo = totalCalificaciones / numActividades;
                    totalPromedioModulos += promedioModulo;
                    numModulosConActividadesCalificadas++;
                }
            });

            const promedioModulosCurso = numModulosConActividadesCalificadas !== 0 ? totalPromedioModulos / numModulosConActividadesCalificadas : 0;
            promediosPorCurso[curso.id_curso] = promedioModulosCurso;
        });

        return promediosPorCurso;
    };

  return (
    <>
        {cursos ? <>
            <Link to="/cursos"> Volver al listado de cursos </Link>
            <div className='overflow-y-scroll container' style={{height: "65vh", width: '930px'}}>
                {cursos.map(curso => (
                    <div key={curso.id_curso} >
                        <div  className='d-flex align-items-center justify-content-between'>
                                <div className=""><h3>{curso.titulo}</h3></div>
                                <div className=""><JournalBookmarkFill size={20} /></div>
                        </div>
                        {curso.modulos.map(modulo => (
                            <div key={modulo.id_modulo}>
                                {modulo.actividades.some(actividad => actividad.entrega_actividades.calificaciones && actividad.entrega_actividades.calificaciones.calificacion !== null) && (
                                    <>
                                        <div  className='d-flex align-items-center justify-content-end'>
                                            {/* <div className=""><JournalBookmarkFill size={20} /></div> */}
                                            <div className=""><h4>{modulo.nombre_modulo}</h4></div>
                                        </div>
                                        <div>
                                            {modulo.actividades.map(actividad => (
                                                actividad.entrega_actividades.calificaciones && actividad.entrega_actividades.calificaciones.calificacion !== null && (
                                                    <div key={actividad.id_actividad}>
                                                        <div className='d-flex align-items-center justify-content-end'>
                                                            <div className=""><p>Nota: {actividad.nombre_actividad}: {actividad.entrega_actividades.calificaciones.calificacion}</p></div>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        <p>Promedio del Curso: {calcularPromedioModulosPorCurso()[curso.id_curso]}</p>
                        <Link to={`/cursosDetail/${curso.id_curso}`}>Ver Curso</Link>
                    </div>
                ))}
            </div>
            </> : <> Cargando..</> }
    </>
  )
}

export default NameCurses