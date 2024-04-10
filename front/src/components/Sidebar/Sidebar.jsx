import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../Player/Player'
import ModuleList from './ModuleList'
import { Col, Container, Row } from 'react-bootstrap'

function Sidebar({ cursoDetail, id_curso }) {

    const [archUrl, setArchUrl] = useState("")


    const handleUrl = (url) => {
        console.log(url)
        setArchUrl(url)
    }

  return (
    <>
    <Container>
        <Row className="justify-content-center">
            <Col>
            <div style={{height: "65vh"}}>
                {archUrl.includes("pdf") ? 
                    <iframe src={archUrl} width="500px" height="360px" />
                 : <>
                    <Player url={archUrl} />
                </>}
                </div>
            </Col>
            <Col>
                <div className="overflow-y-scroll" style={{height: "65vh"}}>
                    <ModuleList cursoDetail={cursoDetail} handleUrl={handleUrl} id_curso={id_curso}/>
                </div>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default Sidebar