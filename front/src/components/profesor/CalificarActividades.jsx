import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { JournalBookmarkFill } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import SplitContent from './content/SplitContent';

function CalificarActividades() {
    const [entregasPorProfesor, setEntregasPorProfesor] = useState(null);

    let user = localStorage.getItem('@user');
    user = JSON.parse(user)
   
    console.log('desde Calificaciones: ' + JSON.stringify(user));
    let profesor = user;

    useEffect(() => {
        const fetchEntregasPorProfesor = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profesors/calificaciones/${profesor.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEntregasPorProfesor(data);
          } catch (error) {
            console.error('Error fetching entregas por profesor:', error);
          }
        };
    
        fetchEntregasPorProfesor();
      }, []);
      
      console.log(entregasPorProfesor)
    return (
        
        < >
        {/* <div className='overflow-y-scroll container' style={{ height: "55vh" }}> */}
         {entregasPorProfesor ? <>
         <div className='container-fuild'>
            <SplitContent entregasPorProfesor={entregasPorProfesor}/>
        </div>
            </> : <> Cargando..</> }
    
      </>
    );
  };
  

export default CalificarActividades