import React, { Fragment }from 'react'
import { FilePlay } from 'react-bootstrap-icons'

function ModulesArch({ modulo, handleUrl }) {

  console.log("render ModulesArch")
  return (
    <>
        {modulo.ruta_material_didactico[0].archivos.map(archivo => {
            return(
              <Fragment key={archivo.fName}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className="mx-2"><FilePlay   size={20} /></div>
                    <div className="mx-2"><button onClick={() => handleUrl(archivo.url)}>{archivo.fName}</button></div>
                </div>
              </Fragment>
              )
        })}
    </>
  )
}

export default ModulesArch