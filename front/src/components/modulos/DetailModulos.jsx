import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay } from 'react-bootstrap-icons'

function DetailModulos() {

    const { id_modulo } = useParams()

    const [moduloDetail, setModuloDetail] = useState(null)

    const loadModuloDetail = async () =>{
        console.log(`%c trayendo info de http://localhost:8000/api/modulos/detalle/${id_modulo}`, 'color:green');
        try {
            fetch(`http://localhost:8000/api/modulos/detalle/${id_modulo}`)
            .then (response => response.json())
            .then (result => setModuloDetail(result))
        } catch (error){
            console.log(`%c${error}`, 'color:yellow')
            }
        }
        
        useEffect(() => {
        try{
            loadModuloDetail()
        }
        catch (error){
            console.log(`%c${error}`, 'color:yellow')
        }
        },[]);

  return (
    <>
    { moduloDetail == null ? <div>DetailCursos</div> :<>
        <div className='coaster-detail'>los Detalles {moduloDetail.nombre_modulo} con id: {moduloDetail.id_modulo}</div>
            <hr />
            <br />
            {
                moduloDetail.actividades.map(actividad => {
                    return(<>
                    {/* {JSON.stringify(modulo)} */}
                        <Link to={`/actividadDetail/${actividad.id_actividad}`}>
                            <article key={actividad.id_actividad} style={{display:'inline-block', width: '200px', height: '200px'}}>
                                {/* <img src={coasterDetail.imageUrl} alt='img' style={{ width: '200px', height: '200px'}}></img> */}
                                <Journals  size={35} />
                                <h3>{actividad.id_actividad}</h3>
                                <p>{actividad.nombre_actividad}</p>
                            </article>
                        </Link>
                        {actividad.ruta_actividad[0].archivos.map(video => {
                            return(<>
                               {/*  {JSON.stringify(video)} */}
                                <Link to={video.url}>
                                    <article key={video.url} style={{display:'inline-block', width: '200px', height: '200px'}}>
                                        {/* <img src={coasterDetail.imageUrl} alt='img' style={{ width: '200px', height: '200px'}}></img> */}
                                        <FilePlay  size={35} />
                                        {/* {JSON.stringify(actividad.ruta_actividad[0].url)} */}
                                        {/* <h3>{actividad.ruta_actividad[0].archivos[2].url}</h3> */}
                                        <p>{video.fName}</p>
                                    </article>
                                </Link>
                            </>)
                        })}
                        
                    </>)
                })
            }

            <br />
            {moduloDetail.id_curso}
            <br />
            <Link to={`/cursosDetail/${moduloDetail.id_curso}`}> Volver contenido del curso</Link>
        </>
        }
    </>
  )
}

export default DetailModulos