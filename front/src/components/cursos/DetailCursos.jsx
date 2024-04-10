import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import Sidebar from '../Sidebar/Sidebar'

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
    {cursoDetail?.modulos[0]?.id_modulo ?
      <>
      <div className="container text-center" style={{height: "65vh", width: '930px'}}>
        <Link to="/cursos"> Volver al listado de cursos </Link>
        <Sidebar cursoDetail={cursoDetail} id_curso={id_curso}/>
      </div>
      </> :
      <>
        <div className="container text-center" style={{height: "65vh", width: '930px'}}>

            <div><h4> Este curso no tiene modulos disponibles</h4></div>
        </div>
      </>
        }
        
        
    </>
  )
}

export default DetailCursos