import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import img_cursos from "../../assets/img/img_cursos.jpg";
import CardCurso from './CardCurso';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <>
    
    <div className="overflow-y-scroll container text-center" style={{height: "65vh", width: '930px'}}>
    <Container>
      <Row xs={1} md={2} lg={3} gap={3}>
          {cursos.map(curso =>{
            return (
              <div key={curso.id_curso}>
                  <Col className='m-2'><CardCurso curso={curso} /></Col>
              </div>
            )
          })}
          </Row>
    </Container>
  
    </div>
    
    {/* <div className="overflow-y-scroll d-flex flex-sm-wrap gap-2 align-items-center justify-content-around my-2" style={{height: "65vh", width: '930px'}}>
        
        {cursos.map(curso =>{
          return (
            <div key={curso.id_curso} >
                <CardCurso curso={curso}/>
            </div>
          )
        })}
    </div> */}
    </>
  )
}

export default GetCursos