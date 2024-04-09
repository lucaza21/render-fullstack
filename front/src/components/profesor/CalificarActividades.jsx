import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { JournalBookmarkFill } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar';
import SplitContent from './content/SplitContent';

function CalificarActividades() {
    const [entregasPorProfesor, setEntregasPorProfesor] = useState(null);

    useEffect(() => {
        const fetchEntregasPorProfesor = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/profesors/calificaciones/1`);
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