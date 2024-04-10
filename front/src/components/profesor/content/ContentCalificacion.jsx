import React, { useEffect, useState, Fragment } from 'react'
import { Archive, FileArrowUp } from 'react-bootstrap-icons'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useParams, Link, useLocation, useNavigate } from "react-router-dom"

function ContentCalificacion() {

    const { id_entrega } = useParams()
    const navigate = useNavigate();

    const [file, setFile] = useState(null)
    const [comment, setComment] = useState(null)
    const [grade, setGrade] = useState(null)
    
    

    const postData = {
        calificacion:parseFloat(grade),
        comentario_calificacion:comment
    };

    console.log(postData)

    const sendHandler = async(ev) => {
        ev.preventDefault()
        if(!comment || !grade){
          Swal.fire({
            title: "Error!",
            text: "Favor llenar los campos",
            icon: "warning"
        }) 
            return null
        }
        
        try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calificaciones/crear/${id_entrega}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //mode: 'no-cors',
                    body: JSON.stringify(postData),
                });

                if(response.status == 201) {
                    Swal.fire({
                        title: "Bien Hecho!",
                        text: "Se ha calificado la entrega correctamente!",
                        icon: "success"
                    });
                    //const data = await response.json();
                    navigate("/profesor/calificar")
                } 
                else {
                    Swal.fire({
                    title: "Hummmm Nop",
                    text: "No se ha calificado la entrega!",
                    icon: "warning"
                    })
                }
            } catch (err) {
            console.error(err)
        }

    }

    console.log("render ContentCalificacion")
    
  return (
    <div>
        <>
            {/* <Link to={`/profesor/calificar`}>Volver al menú</Link> */}
            <h3> Califica la actividad</h3>
            <Form>
                <Form.Group className="my-5" controlId="formBasicEmail">
                    <Form.Label>Nota</Form.Label>
                    <Form.Control type="number" placeholder="8" onChange={(ev) => setGrade(ev.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control type="text" placeholder="¡Muy bien!" onChange={(ev) => setComment(ev.target.value)}/>
                </Form.Group>
                <Button variant="warning" type="submit" onClick={(ev) => sendHandler(ev)}>
                    Submit
                </Button>
            </Form>
        </>
    </div>
  )
}

export default ContentCalificacion