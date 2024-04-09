import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../../Player/Player'
import ContentList from './ContentList'


function SplitContent({ entregasPorProfesor }) {

    const [archUrl, setArchUrl] = useState("")
    const handleUrl = (url) => {
        console.log(url)
        setArchUrl(url)
    }

  return (
    <div>

        <div className='container-fluid' >
        <div className='row'>
            <div className="col-lg-8">
                {archUrl.includes("pdf") ? 
                <div className='container'>
                    <iframe src={archUrl} width="90%" height="450px" />
                </div> : <>
                    
                </>}
            </div>
            <div className="col-lg-4 overflow-y-scroll" style={{ height: "65vh"}}>
                <ContentList entregasPorProfesor={entregasPorProfesor} handleUrl={handleUrl}/>
            </div>
            {/* {JSON.stringify(cursoDetail)} */}
            </div>   
        </div>
    </div>
  )
}

export default SplitContent