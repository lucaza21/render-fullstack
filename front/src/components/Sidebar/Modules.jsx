import React from 'react'
import { FilePlay, FolderFill } from 'react-bootstrap-icons'
import ModulesArch from './ModulesArch'
import ModulesAct from './ModulesAct'


function Modules({ modulo, handleUrl, id_curso }) {

  console.log("render Modules")
  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex align-items-center justify-content-center my-1'>
          <div className=""><FolderFill  size={20} /></div>
          <div className="mx-2">{modulo.nombre_modulo}</div>
        </div>
        <div>
          <ModulesArch modulo={modulo} handleUrl={handleUrl}/>
          <ModulesAct modulo={modulo} handleUrl={handleUrl} id_curso={id_curso}/>
        </div>
    </div>
      
    </>
  )
}

export default Modules