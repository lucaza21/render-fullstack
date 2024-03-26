import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../Player/Player'
import ModuleList from './ModuleList'

function Sidebar({ cursoDetail }) {

    const [archUrl, setArchUrl] = useState("")

    const handleUrl = (url) => {
        console.log(url)
        setArchUrl(url)
    }

  return (
    <>
    <div className='container-fluid '>
        <div className='row'>
            <div className="col">
                <Player url={archUrl} />
            </div>
            <div className="col">
                <ModuleList cursoDetail={cursoDetail} handleUrl={handleUrl} />
            </div>
            {/* {JSON.stringify(cursoDetail)} */}
        </div>   
    </div>
    </>
  )
}

export default Sidebar