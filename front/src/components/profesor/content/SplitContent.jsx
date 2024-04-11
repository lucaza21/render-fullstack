import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

import { Journals, FilePlay, FolderFill } from 'react-bootstrap-icons'
import Player from '../../Player/Player'
import ContentList from './ContentList'

import { Col, Container, Row } from 'react-bootstrap'


function SplitContent({ entregasPorProfesor }) {

    const [archUrl, setArchUrl] = useState("")
    const handleUrl = (url) => {
        console.log(url)
        setArchUrl(url)
    }

  return (
    <div>

        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div style={{height: "65vh"}}>
                        {archUrl.includes("pdf") ? 
                        <div className='container'>
                            <iframe src={archUrl} width="500px" height="450px" />
                        </div> : <>
                            {null}
                        </>}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="overflow-y-scroll" style={{ height: "65vh"}}>
                        <ContentList entregasPorProfesor={entregasPorProfesor} handleUrl={handleUrl}/>
                    </div>
                </Col>
                {/* {JSON.stringify(cursoDetail)} */}
            </Row>   
        </Container>
    </div>
  )
}

export default SplitContent