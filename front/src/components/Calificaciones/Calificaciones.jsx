import React from 'react'
import NameCurses from './NameCurses'

function Calificaciones() {

  let user = localStorage.getItem('@user');
  user = JSON.parse(user)
 
  console.log('desde Calificaciones: ' + JSON.stringify(user));
  let alumno = user;
  
  return (<>
    {/* <div>Calificaciones</div> */}
    <div className='container'>
      <NameCurses alumno={alumno}/>
    </div>

  </>
    
  )
}

export default Calificaciones