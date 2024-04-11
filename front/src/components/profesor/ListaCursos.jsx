import DataTable from 'react-data-table-component';
import registro from '../../assets/iconos/registro.png'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
//import iconMaterial from '../../assets/iconos/archivo.png'

function ListaCursos() {

    const [errorMsgModal, setErrorMsgModal] = useState("");
    const [errorMsgModalMaterial, setErrorMsgModalMaterial] = useState("");
    const [cursoId, setCursoId] = useState(null);
    const [file, setFile] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successMessageMaterial, setSuccessMessageMaterial] = useState("");
    console.log("cursoId click:" + cursoId)
    const [cursos, setCursos] = useState([])
    const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;

    const columns = [
        {
            name: 'id',
            selector: row => row.id_curso,
            sortable: true
        },
        {
            name: 'Curso',
            selector: row => row.titulo,
            sortable: true
        },
        {
            name: 'Diseñador',
            selector: row => row.diseñador,
            sortable: true

        },
        {
            name: 'Objetivo',
            selector: row => row.objetivo,
            sortable: true
        },
        {
            name: 'Introducción',
            selector: row => row.introduccion,
            sortable: true
        },
        {
            name: 'Metodología',
            selector: row => row.metodologia,
            sortable: true
        },
        {
            name: 'Perfil',
            selector: row => row.perfil,
            sortable: true
        },
        {
            name: 'Insumos',
            selector: row => row.insumos,
            sortable: true
        },
        {
            name: 'Evaluacion',
            selector: row => row.evaluacion,
            sortable: true
        },
        {
            name: 'Horas',
            selector: row => row.horas,
            sortable: true
        },
        {
            name: 'Semanas',
            selector: row => row.semanas,
            sortable: true
        },
        {
            name: 'MaterialCurso',
            selector: row => row.materialCurso,
            sortable: true
        },
        {
            name: 'Módulo',
            selector: row => 
            <button className='btn' title="Agregar Módulo" data-bs-toggle="modal"
                data-bs-target="#altaModulo" onClick={() => setCursoId(row.id_curso)}><img width={15} height={15} src={registro} /></button>,
        },
        {
            name: 'Material',
            selector: row => 
            <button className='btn' title="Agregar Material" data-bs-toggle="modal"
                data-bs-target="#altaMaterial" onClick={() => setCursoId(row.id_curso)}><img width={15} height={15} src={registro} /></button>,  
        },
    ];

    const loadCursos = async () => {
        var apiUrl;
        apiUrl = host + '/api/catcursos/listar';
        console.log(apiUrl)
        console.log("%c trayendo info de http://localhost:8000/api/catcursos/listar", 'color:green');
        try {
            //fetch("http://localhost:8000/api/catcursos/listar")
            fetch(apiUrl)
                .then(response => response.json())
                .then(result => setCursos(result))
        } catch (error) {
            console.log(`%c${error}`, 'color:yellow')
        }
    };

    const paginacionOpciones = {
        rowsPerPageText: 'filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
    }

    //ExpandedComponent   

     //const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
     const ExpandedComponent = ({ data }) => <pre><ListarModulosCurso/></pre>; 
    
    //ExpandedComponent

    useEffect(() => {
        let interval
        try {
            loadCursos()
            interval = setInterval(() => {
                loadCursos()
            }, 1 * 1000000)
            return () => {
                clearInterval(interval)
            }
        }
        catch (error) {
            console.log(`%c${error}`, 'color:yellow')
        }

    }, []);

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

    console.log("datosModal: " + JSON.stringify(datosModal))
    function onChangeAnyInput() {
        setErrorMsgModal("")
        setErrorMsgModalMaterial("");
    }

    const handleInputChangeModal = (event) => {
        console.log(event.target.value);
        setDatosModal({
            ...datosModal,
            [event.target.name]: event.target.value
        });
        onChangeAnyInput();
    };

    const handleInputChangeMaterial = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        onChangeAnyInput();
    };
    console.log("archivo", file)
    
    //const [modulos, setModulos] = useState([]);

    function readyToSubmitModal() {
        return datosModal.modulo !== "" && datosModal.objetivo_mod !== "" && datosModal.termino_mod !== ""
            && datosModal.inicio_mod !== "" && datosModal.horas_mod !== "" 
    }

    async function altaModulo(event, cursoId) {
        onChangeAnyInput()
        event.preventDefault()
        if (!readyToSubmitModal()) {
            setErrorMsgModal("Se deben llenar todos los campos")
            return
        }
        try {

            const objectModulo = {
                nombre_modulo: datosModal.modulo,
                objetivo_particular: datosModal.objetivo_mod,
                horas: datosModal.horas_mod,
                fecha_inicio: datosModal.inicio_mod,
                fecha_fin: datosModal.termino_mod,
                ruta_material_didactico: "a/una/ruta"
            }
            const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;
            var apiUrl;
            apiUrl = host + '/api/modulos/crear' + `/${cursoId}`;
            console.log(objectModulo)

            if (apiUrl.length != 0) {
                console.log("######### " + apiUrl)
                fetch(apiUrl, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objectModulo)
                }).then(response => {
                    console.log(response);
                    //return response.json;
                    if (response.status == 201) {
                        console.log("modulo creado");
                        setSuccessMessage("Módulo creado satisfactoriamente.");
                        return response.json;
                    } else {
                        setErrorMsgModal("No fue posible crear el módulo.")
                    }
                });
            }
        } catch (event) {
            console.log("################## " + event);
            setErrorMsgModal("No existe conexión")
        }
        event.target.reset();

    }

    function readyToSubmitModalMaterial() {
        return file !== null
    }

    async function altaMaterial(event, cursoId) {
        onChangeAnyInput()
        event.preventDefault()
        if (!readyToSubmitModalMaterial()) {
            setErrorMsgModalMaterial("Debe seleccionar un archivo")
            return
        }
        try {
            const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;
            var apiUrl;
            apiUrl = host + '/api/modulos/subir' + `/${cursoId}`;
              console.log("api: "+apiUrl)
            if (apiUrl.length != 0) {
                console.log("######### " + apiUrl)

                const formData = new FormData()
                formData.append('file', file)

                fetch(apiUrl, {
                    method: 'POST',
                    //headers: { "Content-Type": "application/json" },
                    body: formData
                }).then(response => {
                    console.log(response);
                    //return response.json;
                    if (response.status == 200) {
                        console.log("material creado");
                        setSuccessMessageMaterial("El archivo se cargo correctamente.");
                        return response.json;
                    } else {
                        setErrorMsgModalMaterial("No fue posible cargar el archivo.")
                    }
                });
            }
        } catch (event) {
            console.log("################## " + event);
            setErrorMsgModalMaterial("No existe conexión")
        }
        event.target.reset();
        setFile(null)
    }


    return (
        <>
            {/*CONTENEDOR PRINCIPAL*/}
            <div className="container-fluid">
                {/*SECCIÓN TITULO*/}
                <div className="row">
                    <div className="col-md-10">
                        <p className="h4" style={{ textAlign: "center" }}>Listado de Cursos</p>
                        <hr className="border-1"></hr>
                    </div>
                </div>
                {/*FIN SECCIÓN TITULO*/}
                

                {/*<div className="row">
                    <div className="col-md-12">
                        <input type='text' onChange={handleChange} />
                    </div>
                </div>*/}

                <div className="row">
                    <div className="col-md-10">
                        {/*NUEVA TABLA*/}
                        <DataTable
                            columns={columns}
                            data={cursos}
                            pagination
                            paginationComponentOptions={paginacionOpciones}
                            fixedHeader
                            fixedHeaderScrollHeight='800px'
                            highlightOnHover
                        />
                        {/*FIN DE NUEVA TABLA*/}
                    </div>
                </div>

            </div>{/*FIN CONTENEDOR PRINCIPAL*/}

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
                            onSubmit={(ev) => altaModulo(ev, cursoId)}
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

                                    {/* <div className='row'>
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
                                    </div> */}

                                    {errorMsgModal && <div className="alert alert-danger" role="alert">
                                        {errorMsgModal}
                                    </div>}
                                    {successMessage && <div className="alert alert-success" role="alert">
                                        {successMessage}
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

            {/* Modal Material*/}
            <div
                className="modal fade"
                id="altaMaterial"
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
                            onSubmit={(ev) => altaMaterial(ev, cursoId)}
                        >
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="altaMaterial">
                                    Cargar Mateial Didáctico al Curso
                                </h1>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid" style={{ padding: "10px" }}>
                                    
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
                                                    id="fileinput"
                                                    onChange={handleInputChangeMaterial}
                                                />
                                            </div>
                                        </div>
                                    </div> 

                                    {errorMsgModalMaterial && <div className="alert alert-danger" role="alert">
                                        {errorMsgModalMaterial}
                                    </div>}
                                    {successMessageMaterial && <div className="alert alert-success" role="alert">
                                        {successMessageMaterial}
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
                                    Subir Archivo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                                </div>
            {/* Fin Modal Material*/}
        </>

    )
}

export default ListaCursos