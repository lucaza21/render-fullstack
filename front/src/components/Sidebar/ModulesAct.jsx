import React from 'react'
import { Archive, FileArrowUp } from 'react-bootstrap-icons'
import ActivityArch from './ActivityArch'

import { useParams, Link } from "react-router-dom"

function ModulesAct({ modulo, handleUrl, id_curso }) {

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
                    <Link to={{ pathname:`/cargar/${actividad.id_actividad}`}} state={{id_curso:id_curso}}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div class=""><FileArrowUp  size={20} /></div>
                            <div class="">Entregar Actividad {actividad.id_actividad}</div>
                        </div>
                    </Link>
                </>)
            })}
        </>
      )
    }
export default ModulesAct