import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../Player/Player'
import Modules from './Modules'

import { Accordion, Button, Card } from 'react-bootstrap';

function ModuleList({ cursoDetail, handleUrl, id_curso }) {

    console.log("render ModuleList")
    
  return (
    <Fragment>
        {/*<!-- Sidebar - Brand -->*/}
        { cursoDetail == null ? <div>SideBar</div> :<>
            {/* <div className='coaster-detail'>Curso {cursoDetail.titulo} con id: {cursoDetail.id_curso}</div> */}
            <div className=''> {cursoDetail.titulo} </div>
            <hr className="sidebar-divider"/>
            <Accordion>
            {
                cursoDetail.modulos.map(modulo => {
                    return(
                        <Card key={modulo.id_modulo}>
                            {/* {JSON.stringify(modulo)} */}
                            <Accordion.Item eventKey={modulo.id_modulo}>
                                <Modules key={modulo.id_modulo} modulo={modulo} handleUrl={handleUrl} id_curso={id_curso}/>
                            </Accordion.Item>
                            {/*<!-- Divider -->*/}
                        </Card>
                    )
                })
            }
            </Accordion>
            </>
        }
    </Fragment>
  )
}

export default ModuleList