import React, { Fragment } from 'react'
import { Archive, FileArrowUp } from 'react-bootstrap-icons'
import ActivityArch from './ActivityArch'

import { useParams, Link } from "react-router-dom"
import { Card } from 'react-bootstrap'

function ModulesAct({ modulo, handleUrl, id_curso }) {
    console.log("render ModulesAct")
    return (
        <>
            {modulo.actividades.toReversed().map(actividad => {
                return(
                    <Fragment key={actividad.nombre_actividad} >
                        {/* {JSON.stringify(actividad)} */}
                        <Card className='my-2'>
                            <Card.Header className='bg-secondary text-white'>
                            <div className='d-flex align-items-center justify-content-evenly'>
                                <div className="mx-2"><Archive size={20} /></div>
                                <div className="mx-2">{actividad.nombre_actividad}</div>
                            </div>
                            </Card.Header>
                            <Card.Body>
                                <ActivityArch actividad={actividad} handleUrl={handleUrl} />
                                <Link to={{ pathname:`/cargar/${actividad.id_actividad}`}} state={{id_curso:id_curso}}>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className=""><FileArrowUp  size={20} /></div>
                                        <div className="mx-2">Entregar Actividad</div>
                                    </div>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Fragment>
                )
            })}
        </>
      )
    }
export default ModulesAct