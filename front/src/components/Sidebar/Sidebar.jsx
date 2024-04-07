import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../Player/Player'
import ModuleList from './ModuleList'

function Sidebar({ cursoDetail, id_curso }) {

    const [archUrl, setArchUrl] = useState("")


    const handleUrl = (url) => {
        console.log(url)
        setArchUrl(url)
    }

  return (
    <>
    <div className='container-fluid' >
        <div className='row'>
            <div className="col">
                {archUrl.includes("pdf") ? 
                <div className='container my-2'>
                    <iframe src={archUrl} width="640px" height="360px" />
                </div> : <>
                    <Player url={archUrl} />
                </>}
            </div>
            <div className="col overflow-y-scroll" style={{height: "68vh"}}>
                <ModuleList cursoDetail={cursoDetail} handleUrl={handleUrl} id_curso={id_curso}/>
            </div>
            {/* {JSON.stringify(cursoDetail)} */}
        </div>   
    </div>
    </>
  )
}

export default Sidebar