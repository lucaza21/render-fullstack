import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Loader from '../elements/Loader';
import useAutorizacion from '../../hooks/useAutorizacion';
import DataTable from 'react-data-table-component';
import eliminar from '../../assets/iconos/eliminar.png'

function AltaCurso() {

    const { isLoading } = useAutorizacion();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgModal, setErrorMsgModal] = useState("");

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
            && datosCurso.semanas !== "" && datosCurso.materialCurso !== ""

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
            {/* Aquí incluir la función para insertar los datos en la base de datos
                para obtener los datos del formulario usar datosCurso.titulo, datosCurso.diseñador, datosCurso.objetivo
                datosCurso.introduccion,datosCurso.metodologia,datosCurso.perfil,datosCurso.insumos,datosCurso.evaluacion
                datosCurso.semanas,datosCurso.horas,datosCurso.materialCurso
                Para los datos del modulo se toman del siguiente arregle: */}


        } catch (e) {
            setErrorMsg("Insertar error")
        }
    }

    /*INFORMACIÓN INFORMACIÓN DE LA TABLA MÓDULOS*/
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.modulo,
        },
        {
            name: 'Objetivo',
            selector: row => row.objetivo_mod,
        },
        {
            name: 'Horas',
            selector: row => row.horas_mod,
        },
        {
            name: 'Inicio',
            selector: row => row.inicio_mod,
        },
        {
            name: 'Término',
            selector: row => row.termino_mod,
        },
        {
            name: 'Material',
            selector: row => row.material_mod,
        },
        /*{
            name: 'Acciones',
            selector: row => <img width={15} height={15} src={eliminar}/>,
        },*/
    ];

    const [datosModal, setDatosModal] = useState(
        {
            modulo: '',
            objetivo_mod: '',
            horas_mod: '',
            inicio_mod: '',
            termino_mod: '',
            material_mod: '',
        }
    );

    

    const handleInputChangeModal = (event) => {
        console.log(event.target.value);
        setDatosModal({
            ...datosModal,
            [event.target.name]: event.target.value
        });
        onChangeAnyInput();
    };
    const [modulos, setModulos] = useState([]);

    function readyToSubmitModal() {
        return datosModal.modulo !== "" && datosModal.objetivo_mod !== "" && datosModal.termino_mod !== ""
            && datosModal.inicio_mod !== "" && datosModal.horas_mod !== "" && datosModal.material_mod !== ""
    }

    async function altaModulo(event) {
        dismissError()
        event.preventDefault()
        if (!readyToSubmitModal()) {
            setErrorMsgModal("Se deben llenar todos los campos")
            return
        }
        const nuevoModulo = [
            {
                modulo: datosModal.modulo,
                objetivo_mod: datosModal.objetivo_mod,
                horas_mod: datosModal.horas_mod,
                inicio_mod: datosModal.inicio_mod,
                termino_mod: datosModal.termino_mod,
                material_mod: datosModal.material_mod,
            },
        ]

        setModulos(...modulos,nuevoModulo)
        console.log("datos modulo: " + modulos);

    }

    const paginacionOpciones = {
        rowsPerPageText: 'filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
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
                    className='formulario needs-validation'
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
                    <div className="row bg-danger bg-opacity-80" style={{ marginBottom: "15px" }}>
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
                    </div>


                    {/*AGREGAR MÓDULOS */}
                    <div className="row bg-danger bg-opacity-80" style={{ marginBottom: "15px" }}>
                        <div className="col-md-12">
                            <p style={{ margin: "0px", paddingTop: "7px", paddingBottom: "7px" }}
                                className="fw-medium text-center">Agregar Módulos al Curso</p>
                        </div>
                    </div>

                    {/*ÁREA DE MODAL PARA FORMULARIO DE ALTA MÓDULO */}
                    {/* Button trigger modal */}
                    <Button
                        variant="dark"
                        size="sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#altaModulo"
                    >Agregar Módulo
                    </Button>

                    {/*FIN DE ÁREA DE MODAL PARA FORMULARIO DE ALTA MÓDULO */}

                    {/*TERMINA AGREGAR MÓDULOS */}

                    <div className="row bg-body-tertiary">
                        <div className='col-md-12 table-responsive'>

                            {/*NUEVA TABLA*/}
                            <DataTable
                                columns={columns}
                                data={modulos}
                                pagination
                                paginationComponentOptions={paginacionOpciones}
                                fixedHeader
                                fixedHeaderScrollHeight='500px'
                                title="Listado de módulos del curso"
                            />
                            {/*FIN DE NUEVA TABLA*/}

                        </div>
                    </div>


                    {errorMsg && <div className="alert alert-danger" role="alert">
                        {errorMsg}
                    </div>}
                    <hr className="border-1"></hr>

                    {/*SECCIÓN BOTONES*/}
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2">
                            <Button variant="dark" size="sm" type="submit">
                                Guardar
                            </Button>{' '}
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

            {/* Modal */}
            <div
                className="modal fade"
                id="altaModulo"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <form
                            className='formulario'
                            onSubmit={altaModulo}
                        >
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="altaModulo">
                                    Alta Módulo
                                </h1>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid" style={{ padding: "10px" }}>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Nombre del Módulo
                                                </label>
                                                <input
                                                    name='modulo'
                                                    id="modulo"
                                                    className="form-control"
                                                    onChange={handleInputChangeModal}
                                                    placeholder='Nombre del módulo'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Objetivo
                                                </label>
                                                <input
                                                    name='objetivo_mod'
                                                    id="objetivo_mod"
                                                    className="form-control"
                                                    onChange={handleInputChangeModal}
                                                    placeholder='Objetivo particular'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Horas
                                                </label>
                                                <input
                                                    min="1" pattern="^[0-9]+"
                                                    type="number"
                                                    name='horas_mod'
                                                    id="horas_mod"
                                                    className="form-control"
                                                    onChange={handleInputChangeModal}
                                                    placeholder='Duración'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Fecha de inicio
                                                </label>
                                                <input
                                                    type='date'
                                                    name='inicio_mod'
                                                    id="inicio_mod"
                                                    className="form-control"
                                                    onChange={handleInputChangeModal}
                                                    placeholder='Inicio'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Fecha de término
                                                </label>
                                                <input
                                                    type='date'
                                                    name='termino_mod'
                                                    id="termino_mod"
                                                    className="form-control"
                                                    onChange={handleInputChangeModal}
                                                    placeholder='Término'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="nombre">
                                                    Material didáctico
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    aria-label="file example"
                                                    id="material_mod"
                                                    name="material_mod"
                                                    required=""
                                                    accept=".pdf,.doc,image/*"
                                                    multiple
                                                    onChange={handleInputChangeModal}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {errorMsgModal && <div className="alert alert-danger" role="alert">
                                        {errorMsgModal}
                                    </div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    variant="dark"
                                    size="sm"
                                    type="reset"
                                    data-bs-dismiss="modal"
                                >Cancelar
                                </Button>
                                <Button
                                    variant="dark"
                                    size="sm"
                                    type="submit">
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Fin Modal */}
        </>
    )
}

export default AltaCurso