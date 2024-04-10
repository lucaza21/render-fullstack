import React from 'react'
import { FilePlay, FolderFill } from 'react-bootstrap-icons'
import ModulesArch from './ModulesArch'
import ModulesAct from './ModulesAct'
import { Accordion, Button, Card } from 'react-bootstrap';

function Modules({ modulo, handleUrl, id_curso }) {

  console.log("render Modules")
  return (
    <>
    
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <Accordion.Header>
          <div className='d-flex align-items-center justify-content-center my-1'>
            <div className="mx-2"><FolderFill  size={20} /></div>
            <div className="mx-2">{modulo.nombre_modulo}</div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
            <ModulesArch modulo={modulo} handleUrl={handleUrl}/>
            <ModulesAct modulo={modulo} handleUrl={handleUrl} id_curso={id_curso}/>
        </Accordion.Body>
    </div>
      
    </>
  )
}

export default Modules