import React, { Fragment } from 'react'
import { FileArrowDown } from 'react-bootstrap-icons'
function ActivityArch({ actividad, handleUrl }) {

    console.log("render ActivityArch")

    const archivo = actividad.ruta_actividad[0].archivos[0]
    console.log(JSON.stringify(archivo))
    return (
        <>
            <Fragment key={archivo.fName}>
                {/* {JSON.stringify(archivo)} */}
                <div className='d-flex align-items-center justify-content-between'>
                    <div className=""><FileArrowDown   size={20} /></div>
                    <div className=""><button onClick={() => handleUrl(archivo.url)}>{archivo.fName}</button></div>
                </div>
            </Fragment>

        </>
      )
    }
    
export default ActivityArch