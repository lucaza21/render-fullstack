import React from 'react'
import { FilePlay, FolderFill } from 'react-bootstrap-icons'
import ModulesArch from './ModulesArch'
import ModulesAct from './ModulesAct'


function Modules({ modulo, handleUrl }) {
  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex align-items-center justify-content-center my-1'>
          <div class=""><FolderFill  size={20} /></div>
          <div class="mx-2">{modulo.nombre_modulo}</div>
        </div>
        <div>
          <ModulesArch modulo={modulo} handleUrl={handleUrl}/>
          <ModulesAct modulo={modulo} handleUrl={handleUrl}/>
        </div>
    </div>
      
    </>
  )
}

export default Modules