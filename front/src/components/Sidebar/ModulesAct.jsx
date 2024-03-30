import React from 'react'
import { Archive } from 'react-bootstrap-icons'
import ActivityArch from './ActivityArch'

function ModulesAct({ modulo, handleUrl }) {
    return (
        <>
            {modulo.actividades.toReversed().map(actividad => {
                return(<>
                {/* {JSON.stringify(actividad)} */}
                    <div className='d-flex align-items-center justify-content-between'>
                        <div class=""><Archive size={20} /></div>
                        <div class="">{actividad.nombre_actividad}</div>
                    </div>
                    <ActivityArch actividad={actividad} handleUrl={handleUrl} />
                </>)
            })}
        </>
      )
    }
export default ModulesAct