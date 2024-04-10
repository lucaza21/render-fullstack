import React from 'react'
import NameCurses from './NameCurses'
import { Link } from 'react-router-dom';

function Calificaciones() {

  let user = localStorage.getItem('@user');
  user = JSON.parse(user)
 
  console.log('desde Calificaciones: ' + JSON.stringify(user));
  let alumno = user;
  
  return (<>
    {/* <div>Calificaciones</div> */}
    <div className="overflow-y-scroll container text-center" style={{height: "65vh", width: '930px'}}>
    <div className='container'>
      
      <NameCurses alumno={alumno}/>
    </div>
    </div>

  </>
    
  )
}

export default Calificaciones