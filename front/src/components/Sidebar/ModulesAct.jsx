import React, { Fragment } from 'react'
import { Archive, FileArrowUp } from 'react-bootstrap-icons'
import ActivityArch from './ActivityArch'

import { useParams, Link } from "react-router-dom"

function ModulesAct({ modulo, handleUrl, id_curso }) {
    console.log("render ModulesAct")
    return (
        <>
            {modulo.actividades.toReversed().map(actividad => {
                return(
                    <Fragment key={actividad.nombre_actividad}>
                        {/* {JSON.stringify(actividad)} */}
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className=""><Archive size={20} /></div>
                            <div className="">{actividad.nombre_actividad}</div>
                        </div>
                        <ActivityArch actividad={actividad} handleUrl={handleUrl} />
                        <Link to={{ pathname:`/cargar/${actividad.id_actividad}`}} state={{id_curso:id_curso}}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className=""><FileArrowUp  size={20} /></div>
                                <div className="">Entregar Actividad</div>
                            </div>
                        </Link>
                    </Fragment>
                )
            })}
        </>
      )
    }
export default ModulesAct