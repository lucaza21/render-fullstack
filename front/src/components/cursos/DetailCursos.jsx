import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Trash, FolderFill } from 'react-bootstrap-icons'

function DetailCursos() {

const { id_curso } = useParams()

  const [cursoDetail, setCursoDetail] = useState(null)

  const loadCursoDetail = async () =>{
    console.log(`%c trayendo info de ${import.meta.env.VITE_BACKEND_URL}/api/catcursos/detalle/${id_curso}`, 'color:green');
    try {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/catcursos/detalle/${id_curso}`)
        .then (response => response.json())
        .then (result => setCursoDetail(result))
    } catch (error){
        console.log(`%c${error}`, 'color:yellow')
        }
    }
    
    useEffect(() => {
    try{
        loadCursoDetail()
    }
    catch (error){
        console.log(`%c${error}`, 'color:yellow')
    }
    },[]);

  return (
    <>
        { cursoDetail == null ? <div>DetailCursos</div> :<>
            <div className='coaster-detail'>los Detalles de... {cursoDetail.titulo} con id: {id_curso}</div>
            <hr />
            <br />
            {
                cursoDetail.modulos.map(modulo => {
                    return(<>
                    {/* {JSON.stringify(modulo)} */}
                        <Link to={`/modulosDetail/${modulo.id_modulo}`}>
                            <article key={modulo.id_modulo} style={{display:'inline-block', width: '200px', height: '200px'}}>
                                {/* <img src={coasterDetail.imageUrl} alt='img' style={{ width: '200px', height: '200px'}}></img> */}
                                <FolderFill  size={35} />
                                <h3>{modulo.id_modulo}</h3>
                                <p>{modulo.nombre_modulo}</p>
                            </article>
                        </Link>
                    </>)
                })
            }
            </>
        }
        <br />
        <br />
        <Link to="/cursos"> Volver al inicio</Link>
    </>
  )
}

export default DetailCursos