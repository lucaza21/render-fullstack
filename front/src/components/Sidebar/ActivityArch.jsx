import React from 'react'
import { FileArrowDown } from 'react-bootstrap-icons'
function ActivityArch({ actividad, handleUrl }) {
    return (
        <>
            {actividad.ruta_actividad[0].archivos.map(archivo => {
                return(<>
                {/* {JSON.stringify(archivo)} */}
                    <div className='d-flex align-items-center justify-content-between' key={archivo.fName}>
                        <div class=""><FileArrowDown   size={20} /></div>
                        <div class=""><button onClick={() => handleUrl(archivo.url)}>{archivo.fName}</button></div>
                    </div>
                </>)
            })}
        </>
      )
    }
    
export default ActivityArch