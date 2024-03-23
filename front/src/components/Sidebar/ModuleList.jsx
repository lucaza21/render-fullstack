import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../Player/Player'
import Modules from './Modules'

function ModuleList({ cursoDetail, handleUrl }) {

    
  return (
    <>
        {/*<!-- Sidebar - Brand -->*/}
        { cursoDetail == null ? <div>SideBar</div> :<>
            {/* <div className='coaster-detail'>Curso {cursoDetail.titulo} con id: {cursoDetail.id_curso}</div> */}
            <div className=''> {cursoDetail.titulo} </div>
            <hr className="sidebar-divider"/>
            {
                cursoDetail.modulos.map(modulo => {
                    return(<>
                    {/* {JSON.stringify(modulo)} */}
                        <div >
                            <Modules key={modulo.id_modulo} modulo={modulo} handleUrl={handleUrl}/>
                        </div>
                        {/*<!-- Divider -->*/}
                        <hr className="sidebar-divider"/>

                    </>)
                })
            }
            </>
        }
    </>
  )
}

export default ModuleList