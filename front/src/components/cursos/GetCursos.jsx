import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import img_cursos from "../../assets/img/img_cursos.jpg";

function GetCursos() {

    const [cursos, setCursos] = useState([])
  
  const loadCursos = async () =>{
      console.log(`%c trayendo info de ${import.meta.env.VITE_BACKEND_URL}/api/catcursos/listar`, 'color:green');
      try {
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/catcursos/listar`)
          .then (response => response.json())
          .then (result => setCursos(result))
      } catch (error){
          console.log(`%c${error}`, 'color:yellow')
    }
  };

  useEffect(() => {
    let interval
    try{
      loadCursos()
      interval = setInterval(()=>{
        loadCursos()
    }, 1*1000000)
    return () => {
        clearInterval(interval)
    }
    }
    catch (error){
      console.log(`%c${error}`, 'color:yellow')
  }
    
  }, []);

  console.log("render GetCursos")
  return (
    <div className="overflow-y-scroll d-flex align-items-center justify-content-around" style={{height: "63vh", width: '930px'}}>
        {/* <div>GetCursos</div> */}
        {cursos.map(curso =>{
          return (
            <Fragment key={curso.id_curso} >
              <Link to={`/cursosDetail/${curso.id_curso}`}>
                <article className='coaster-card '>
                <h3>{curso.titulo}</h3>
                  <img src={img_cursos} alt='img' width={200} height={200}></img>
                  {/* <h2>{curso.profesor}</h2> */}
                </article>
              </Link>
              {/* <div>
                <button type='submit' onClick={()=> deleteCoaster(coaster._id)}> eliminar {curso.titulo}</button>
              </div> */}
              {/* <br />
                <Link to={`/updatecoaster/${curso.id_curso}`}> Actualizar </Link>
              <br /> */}
            </Fragment>
          )
        })}

    </div>
    
  )
}

export default GetCursos