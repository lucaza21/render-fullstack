import React, {useState, useEffect, Fragment} from 'react'
import { JournalBookmarkFill } from 'react-bootstrap-icons'

function NameCurses() {

    const [cursos, setCursos] = useState(null)
    const [modulos, setModulos] = useState(null)
    const [actividades, setActividades] = useState(null)
  
    const loadCursos = async () =>{
        console.log(`%c trayendo info de ${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/2`, 'color:green');
        try {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/calificaciones/1`)
            .then (response => response.json())
            .then (result => setCursos(result))
        } catch (error){
            console.log(`%c${error}`, 'color:yellow')
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

     /* const total = cursos?.modulos?.actividades?.entrega_actividades?.calificaciones?.calificacion.reduce(
        (prevValue, currentValue) => {prevValue + currentValue}
        ,0) ; */

  return (
    <>
        <div>NameCurses</div>
        {cursos ? <>
            {cursos.map((curso, i) =>{
          return (
            <Fragment key={i}>
                <div  className='d-flex align-items-center justify-content-between'>
                    <div className=""><JournalBookmarkFill size={20} /></div>
                    <div className=""><h3>{curso.titulo}</h3></div>
                </div>
                {curso.modulos.length > 0 ? curso.modulos.map((modulo, i) =>{
                    return (
                        <Fragment key={i}>
                            {modulo.actividades.map((actividad,i) => {
                                return(
                                    <Fragment key={i}>
                                        <div className='d-flex align-items-center justify-content-end'>
                                            <div className=""><p>Nota {actividad.nombre_actividad}</p></div>
                                            <div className=""><p>: {actividad.entrega_actividades.calificaciones.calificacion}</p></div>
                                        </div>
                                    </Fragment>
                                )
                            })}
                            {/* {modulo?.actividades?.reduce((previousValue, currentValue ) => {
                                return(
                                    <Fragment>
                                    {JSON.stringify(previousValue?.entrega_actividades?.calificaciones?.calificacion)}
                                    {JSON.stringify(currentValue?.entrega_actividades?.calificaciones?.calificacion)}
                                    {currentValue?.entrega_actividades?.calificaciones.calificacion  +  previousValue.entrega_actividades?.calificaciones.calificacion}
                                        <div className='d-flex align-items-center justify-content-end'>
                                            <div className=""><p>Total { currentValue.entrega_actividades?.calificaciones.calificacion  +  previousValue.entrega_actividades?.calificaciones.calificacion}</p></div>
                                        </div> 
                                    </Fragment>
                                )
                            },0)} */}
                        </Fragment>
                        
                    )
                    }) :<div>no Data</div>}
            </Fragment>
          )
        })}
        </> : <> Cargando..</> }
        
    </>
  )
}

export default NameCurses