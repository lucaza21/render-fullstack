import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Loader from '../elements/Loader';
import useAutorizacion from '../../hooks/useAutorizacion';
import DataTable from 'react-data-table-component';
import eliminar from '../../assets/iconos/eliminar.png'

function AltaCurso() {

    let user = localStorage.getItem('@user');
    user = JSON.parse(user)
    
    console.log('desde Calificaciones: ' + JSON.stringify(user));
    let profesor = user;


    const { isLoading } = useAutorizacion();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgModal, setErrorMsgModal] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [datosCurso, setDatosCurso] = useState(
        {
            titulo: '',
            diseñador: '',
            objetivo: '',
            introduccion: '',
            metodologia: '',
            perfil: '',
            insumos: '',
            evaluacion: '',
            horas: '',
            semanas: '',
            materialCurso: ''
        }
    );


    const handleInputChange = (event) => {
        console.log(event.target.value);
        setDatosCurso({
            ...datosCurso,
            [event.target.name]: event.target.value
        });
        onChangeAnyInput();
    };

    function readyToSubmit() {
        return datosCurso.titulo !== "" && datosCurso.diseñador !== "" && datosCurso.objetivo !== ""
            && datosCurso.introduccion !== "" && datosCurso.metodologia !== "" && datosCurso.perfil !== ""
            && datosCurso.insumos !== "" && datosCurso.evaluacion !== "" && datosCurso.horas !== ""
            && datosCurso.semanas !== ""

    }


    function dismissError() {
        setErrorMsg("")
        setErrorMsgModal("")
    }
    function onChangeAnyInput() {
        setErrorMsg("")
        setErrorMsgModal("")
    }

    async function doAlta(event) {
        dismissError()
        event.preventDefault()
        if (!readyToSubmit()) {
            setErrorMsg("Es necesario llenar todos los campos")
            return
        }        
        try {           
            const object = {
                titulo: datosCurso.titulo,
                nombre_disenador: datosCurso.diseñador,
                objetivo: datosCurso.objetivo,
                introduccion: datosCurso.introduccion,
                metodologia: datosCurso.metodologia,
                perfil_ingreso: datosCurso.perfil,
                insumos: datosCurso.insumos,
                evaluacion: datosCurso.evaluacion,
                horas: datosCurso.horas,
                semanas: datosCurso.semanas,
                ruta_material_didactico: "/una/ruta"
            }
            const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;
            
            var apiUrl;
            apiUrl = host + import.meta.env.VITE_ENDPOINT_CATCURSO_CREAR + profesor.id;
            console.log(object)

            if (apiUrl.length != 0) {
                console.log("######### " + apiUrl)
                fetch(apiUrl, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(object)
                })
                    .then(response => {
                        console.log(response);
                        //return response.json;
                        if (response.status == 201) {
                            console.log("curso creado");
                            setSuccessMessage("Curso creado satisfactoriamente.");
                            return response.json;                            
                        } else {
                            setErrorMsg("No fue posible crear el curso.")
                        }
                    });
            }
        } catch (event) {
            console.log("################## " + e);
            setErrorMsg("No existe conexión")
        }
        event.target.reset();
    }

    return (
        <>
            <div className="container-fluid">
                {/*SECCIÓN TITULO*/}
                <div className="row">
                    <div className="col-md-12">
                        <p className="h4" style={{ textAlign: "center" }}>Alta de Curso</p>
                    </div>
                </div>
                {/*FIN SECCIÓN TITULO*/}
                <hr className="border-1"></hr>
                {isLoading && <Loader message={"loading"} />}
                <form
                    className='formulario needs-validation overflow-y-scroll container text-center' style={{height: "55vh", width: '930px'}}
                    onSubmit={doAlta}
                    noValidate
                >

                    {/*COMIENZA FILAS DE FORMULARIO*/}
                    <div className="row">
                        <div className="col-md-1"></div>

                        <div className="col-md-10">

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Título del Curso:
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        name='titulo'
                                        className="form-control"
                                        onChange={handleInputChange}
                                        placeholder='Introduce el título del curso'
                                        required
                                        id="titulo"
                                    />
                                </div>

                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Diseñador del curso:
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        name='diseñador'
                                        id="diseñador"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        placeholder='Introduce el nombre del diseñador del curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Objetivo del Curso:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="objetivo"
                                        name="objetivo"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Redacta el objetivo general del curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Introducción al curso:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="introduccion"
                                        name="introduccion"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Redacta la introducción del curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Metodología de trabajo:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="metodologia"
                                        name="metodologia"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Describe la metodología de trabajo a utilizar en el desarrollo del curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Perfil de Ingreso:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="perfil"
                                        name="perfil"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Establece el perfil de ingreso para el participante en el curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Insumos:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="insumos"
                                        name="insumos"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Indica los requisitos tecnológicos y de materiales para participar en el curso'
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                    Evaluación:
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="evaluacion"
                                        name="evaluacion"
                                        rows={3}
                                        onChange={handleInputChange}
                                        placeholder='Establece la forma de evaluación del curso'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <div className="row bg-danger bg-opacity-80" style={{ marginBottom: "15px" }}>
                        <div className="col-md-12">
                            <p style={{ margin: "0px", paddingTop: "7px", paddingBottom: "7px" }}
                                className="fw-medium text-center">Duración del curso</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Horas:
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        min="1" pattern="^[0-9]+"
                                        type="number"
                                        name='horas'
                                        id="horas"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        placeholder='Horas'
                                    />
                                </div>
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Semanas:
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        min="1" pattern="^[0-9]+"
                                        type="number"
                                        name='semanas'
                                        id="semanas"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        placeholder='Semanas'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    {/*AGREGAR MATERIAL DIDÁCTICO*/}
                    {/* <div className="row bg-danger bg-opacity-80" style={{ marginBottom: "15px" }}>
                        <div className="col-md-12">
                            <p style={{ margin: "0px", paddingTop: "7px", paddingBottom: "7px" }}
                                className="fw-medium text-center">Material Didáctico</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="row mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    aria-label="file example"
                                    id="materialCurso"
                                    name="materialCurso"
                                    required=""
                                    accept=".pdf"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div> */}

                    {errorMsg && <div className="alert alert-danger" role="alert">
                        {errorMsg}
                    </div>}
                    {successMessage && <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>}
                    <hr className="border-1"></hr>

                    {/*SECCIÓN BOTONES*/}
                    <div className="row">
                        <div className="col-md-5"></div>
                            <div className="col-md-2">
                                <Button variant="dark" size="sm" type="submit">
                                    Guardar
                                </Button>{' '}
                            </div>
                            <div className="col-md-2">
                                <Link to='/profesor/home'>
                                    <Button variant="dark" size="sm">
                                        Cancelar
                                    </Button>
                                </Link>
                            </div>
                        <div className="col-md-5"></div>
                    </div>
                    {/*FIN SECCIÓN BOTONES*/}
                </form>
            </div>
        </>
    )
}

export default AltaCurso