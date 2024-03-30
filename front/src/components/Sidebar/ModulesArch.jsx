import React from 'react'
import { FilePlay } from 'react-bootstrap-icons'

function ModulesArch({ modulo, handleUrl }) {
  return (
    <>
        {modulo.ruta_material_didactico[0].archivos.map(archivo => {
            return(<>
                <div className='d-flex align-items-center justify-content-between'>
                    <div class=""><FilePlay   size={20} /></div>
                    <div class=""><button onClick={() => handleUrl(archivo.url)}>{archivo.fName}</button></div>
                </div>
            </>)
        })}
    </>
  )
}

export default ModulesArch