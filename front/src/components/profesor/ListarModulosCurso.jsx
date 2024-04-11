import DataTable from 'react-data-table-component';
import registro from '../../assets/iconos/registro.png'
import iconMaterial from '../../assets/iconos/archivo.png'
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';


function ListarModulosCurso({ data }) {

    const [modulos, setModulos] = useState([]);
    const [moduloId, setModuloId] = useState(null);
    const [actividadId, setActividadId] = useState(null);
    const [id_curso, setCursoId] = useState(data.id_curso);
    const [file, setFile] = useState("");
    const [errorMsgModalActividad, setErrorMsgModalActividad] = useState("");
    const [successMessageActividad, setSuccessMessageActividad] = useState("");
    //const { id_curso } = useParams()

    console.log("modulos: ", modulos)
    console.log("data: ", id_curso)
    const columns = [
        {
            name: 'id_modulo',
            selector: row => row.id_modulo,
            sortable: true
            
        },
        {
            name: 'id_curso',
            selector: row => row.id_curso,
            sortable: true
        },
        {
            name: 'Módulo',
            selector: row => row.nombre_modulo,
            sortable: true

        },
        {
            name: 'Objetivo',
            selector: row => row.objetivo_particular,
            sortable: true
        },
        {
            name: 'Horas',
            selector: row => row.horas,
            sortable: true
        },
        {
            name: 'Inicio',
            selector: row => row.fecha_inicio,
            sortable: true
        },
        {
            name: 'Término',
            selector: row => row.fecha_fin,
            sortable: true
        },
        
        {
            name: 'Actividad',
            selector: row =>
                <button className='btn' title="Agregar Actividad" data-bs-toggle="modal"
                    data-bs-target="#altaActividad" onClick={() => {setModuloId(row.id_modulo)}}><img width={15} height={15} src={registro} /></button>,
        },
        {
            name: 'Material',
            selector: row =>
                <button className='btn' title="Agregar Material" data-bs-toggle="modal"
                    data-bs-target="#altaMaterialActividad" onClick={() => setModuloId(row.id_modulo)}><img width={15} height={15} src={iconMaterial} /></button>,
        },
    ];

    const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;

    const paginacionOpciones = {
        rowsPerPageText: 'filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
    }

    function readyToSubmitActividad() {
        
        return  datosActividad.nombre !== "" && datosActividad.ponderacion !== ""
            && datosActividad.fechaInit !== "" && datosActividad.fechaFin !== "" 
    }

    console.log("moduloId",moduloId)
    async function altaActividad(event, moduloId) {
        console.log("idModulo: "+moduloId)
        onChangeAnyInput()
        event.preventDefault()
        if (!readyToSubmitActividad()) {
            setErrorMsgModalActividad("Se deben llenar todos los campos")
            return
        }
        try {
            //const url = import.meta.env.VITE_BACK_END_HOST + ':'+ import.meta.env.VITE_BACK_END_PORT + `/api/actividades/crear/${moduloId}`;
             //console.log("url: "+url)
            const object = {
                id_modulo: moduloId,
                nombre_actividad: datosActividad.nombre,
                ponderacion_actividad: datosActividad.ponderacion,
                fecha_inicio: datosActividad.fechaInit,
                fecha_fin: datosActividad.fechaFin,
                ruta_actividad: "a/una/ruta" 
               }
            console.log(object)

                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/actividades/crear/${moduloId}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(object)
                }).then(response => {
                    const data = response.json();
                    return data;
                }).then(dataRes => {
                    console.log(dataRes)
                    setActividadId(dataRes.actividad.id_actividad)
                    if (dataRes.message == "se ha creado la actividad") {
                        //console.log("modulo creado");
                        setSuccessMessageActividad("Actividad creada satisfactoriamente.");
                        return dataRes;
                    } else {
                        setErrorMsgModalActividad("No fue posible crear la actividad.")
                    }
                })
                setSuccessMessageActividad("")
                setErrorMsgModalActividad("")
        } catch (event) {
            console.log("################## " + event);
            setErrorMsgModalActividad("No existe conexión")
        }
        event.target.reset();

    }

    const loadModulos = async () => {
        //var apiUrl;
        //apiUrl = host + '/api/modulos/detallebycurso/1';
        //console.log(apiUrl)
        console.log(`${import.meta.env.VITE_BACKEND_URL}/api/modulos/detallebycurso/${id_curso}`, 'color:green');
        try {
            //fetch("http://localhost:8000/api/modulos/detallebycurso/1")
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/modulos/detallebycurso/${id_curso}`)
                .then(response => response.json())
                .then(result => setModulos(result))
        } catch (error) {
            console.log(`%c${error}`, 'color:yellow')
        }
    };

    useEffect(() => {
        let interval
        try {
            loadModulos()
            interval = setInterval(() => {
                loadModulos()
            }, 1 * 1000000)
            return () => {
                clearInterval(interval)
            }
        }
        catch (error) {
            console.log(`%c${error}`, 'color:yellow')
        }

    }, []);

    {/*FUNCIONES MODAL ACTIVIDAD */}

    const [datosActividad, setDatosActividad] = useState(
        {
            curso:'',
            modulo:'',
            nombre:'',
            ponderacion:'',
            fechaInit:'',
            fechaFin:''
        }
    );
    const handleInputChange = (event) => {
        console.log("####################111",event.target.value);
        setDatosActividad({
            ...datosActividad,
            [event.target.name]: event.target.value
        });
        onChangeAnyInput();
    };

   /*  function dismissError() {
        setErrorMsgModalActividad("")
        setSuccessMessageActividad("")
    } */

    function onChangeAnyInput() {
        setErrorMsgModalActividad("")
        setSuccessMessageActividad("")
    }

    function readyToSubmitModalMatAct() {
        return file !== null
    }

    const handleInputChangeMatAct = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        onChangeAnyInput();
    };

    console.log("actividadId", actividadId)
    
    async function altaMaterialActividad(event, actividadId) {
        onChangeAnyInput()
        event.preventDefault()
        if (!readyToSubmitModalMatAct()) {
            setErrorMsgModalActividad("Debe seleccionar un archivo")
            return
        }
        try {
            //const host = import.meta.env.VITE_BACK_END_HOST + ':' + import.meta.env.VITE_BACK_END_PORT;
            //var apiUrl;
            //apiUrl = host + '/api/modulos/subir' + `/${cursoId}`;
            //console.log("api: "+apiUrl)
            //if (apiUrl.length != 0) {
            //   console.log("######### " + apiUrl)

                const formData = new FormData()
                formData.append('file', file)

                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/actividades/subir/${actividadId}`, {
                    method: 'POST',
                    //headers: { "Content-Type": "application/json" },
                    body: formData
                }).then(response => {
                    console.log(response);
                    //return response.json;
                    if (response.status == 200) {
                        console.log("material creado");
                        setModuloId(null)
                        setSuccessMessageActividad("El archivo se cargo correctamente.");
                        return response.json();
                    } else {
                        setErrorMsgModalActividad("No fue posible cargar el archivo.")
                    }
                });
                setSuccessMessageActividad("")
                setErrorMsgModalActividad("")
        } catch (event) {
            console.log("################## " + event);
            setErrorMsgModalActividad("No existe conexión")
        }
        //event.target.reset();
        setFile(null)
        
    }

   



    return (
        <>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {/*NUEVA TABLA*/}
                        <DataTable
                            columns={columns}
                            data={modulos}
                            //pagination
                            //paginationComponentOptions={paginacionOpciones}
                            fixedHeader
                            fixedHeaderScrollHeight='800px'
                            highlightOnHover
                        />
                        {/*FIN DE NUEVA TABLA*/}
                    </div>
                </div>
            </div>

            {/* Modal Material*/}
            <div
                className="modal fade"
                id="altaMaterialActividad"
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
                        onSubmit={(ev) => altaMaterialActividad(ev, actividadId)}
                        >
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="altaMaterialActividad">
                                    Cargar Material Didáctico a la Actividad
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
                                                    onChange={handleInputChangeMatAct}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {errorMsgModalActividad && <div className="alert alert-danger" role="alert">
                                        {errorMsgModalActividad}
                                    </div>}
                                    {successMessageActividad && <div className="alert alert-success" role="alert">
                                        {successMessageActividad}
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


            {/* Modal Actividad*/}
            <div
                className="modal fade"
                id="altaActividad"
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
                            onSubmit={(ev) => altaActividad(ev, moduloId)}
                        >
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="altaActividad">
                                    Alta Actividad
                                </h1>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid" style={{ padding: "10px" }}>

                                    {/*COMIENZA FILAS DE FORMULARIO*/}
                                    <div className="row">
                                        <div className="col-md-1"></div>

                                        <div className="col-md-10">


                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                                    Nombre de Actividad:
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        name='nombre'
                                                        id="nombre"
                                                        className="form-control"
                                                        onChange={handleInputChange}
                                                        placeholder='Introduce el nombre de la actividad'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                                    Ponderacion de la Actividad:
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        id="ponderacion"
                                                        name="ponderacion"
                                                        rows={1}
                                                        onChange={handleInputChange}
                                                        placeholder='Redacta la ponderacion de la actividad'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                                    Fecha de inicio:
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        id="fechaInit"
                                                        name="fechaInit"
                                                        type="date"
                                                        onChange={handleInputChange}
                                                        placeholder='Fecha de inicio del curso'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                                    Fecha fin:
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        id="fechaFin"
                                                        name="fechaFin"
                                                        type="date"
                                                        onChange={handleInputChange}
                                                        placeholder='Fecha final para entregar actividad'
                                                    />
                                                </div>
                                            </div>

                                           {/*} <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                                    Ruta Actividad:
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        className="form-control"
                                                        id="ruta"
                                                        name="ruta"
                                                        rows={1}
                                                        onChange={handleInputChange}
                                                        placeholder='Indica la ruta en fichero para descargar la actividad.'
                                                    />
                                                </div>
                                            </div>*/}
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                    {/*FIN DE ÁREA DE MODAL PARA FORMULARIO DE ALTA ACTIVIDAD */}

                                    {errorMsgModalActividad && <div className="alert alert-danger" role="alert">
                                        {errorMsgModalActividad}
                                    </div>}
                                    {successMessageActividad && <div className="alert alert-success" role="alert">
                                        {successMessageActividad}
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

export default ListarModulosCurso