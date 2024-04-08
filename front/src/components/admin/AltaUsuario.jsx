import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Loader from '../elements/Loader';
import useAutorizacion from '../../hooks/useAutorizacion';
// import {alumno} from '../../models/alumno.ts';
// import importMetaEnv from '../../../vite-env';

function AltaUsuario() {
    const { login, isLoading } = useAutorizacion();
    const [errorMsg, setErrorMsg] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    

    const [datos, setDatos] = useState(
        {
            nombre: '',
            paterno: '',
            materno: '',
            celular: '',
            email: '',
            usuario: '',
            password: '',
            perfil: 0
        }
    );


    const handleInputChange = (event) => {
        console.log(event.target.value);
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
        onChangeAnyInput();
    };

    function onChangeEmail(e) {
        setEmail(e.target.value)
        const texto = e.target.value;
        const index = texto.indexOf("@", 0);
        const usuario = texto.substr(0, index);
        setUsuario(usuario);
        onChangeAnyInput();
    }


    function readyToSubmit() {
        return datos.nombre !== "" && datos.paterno !== "" && datos.materno !== ""
            && datos.celular !== "" && datos.email !== "" && datos.usuario !== ""
            && datos.password !== "" && datos.perfil !== 0
    }
    

    function dismissError() {
        setErrorMsg("")
    }
    function onChangeAnyInput() {
        setErrorMsg("")
    }

    async function doAlta(event) {
        dismissError()
        event.preventDefault()
        let a = readyToSubmit();
        if (!readyToSubmit()) {
            setErrorMsg("Es necesario llenar todos los campos")
            return
        }
        try {
            // {/* Aquí incluir la función para insertar los datos en la base de datos
            //     para obtener los datos del formulario usar datos.nombre, datos.email, datos. materno
            //     datos.paterno, datos.celular.......datos.perfil*/}
            const host = import.meta.env.VITE_BACK_END_HOST + ':'+ import.meta.env.VITE_BACK_END_PORT;
            
            console.log(datos);
            
            const object = {
                nombre :datos.nombre,
                ap_paterno : datos.paterno,
                ap_materno : datos.materno,
                correo : datos.email,
                fecha_registro :new Date(),
                celular : datos.celular,
                usuario : datos.usuario,
                password: datos.password
            }
            var urlAltaUsr;
            //perfil 1 == alumno
            if(datos.perfil == 1){
                urlAltaUsr = host + import.meta.env.VITE_ENDPOINT_ALTA_USER_ALUMNO;
                
            }else if (datos.perfil == 2){ //perfil 2 == profesor
                urlAltaUsr = host + import.meta.env.VITE_ENDPOINT_ALTA_USER_PROFESOR;
                
            }else if(datos.perfil === 3) {// perfil 3 == admin

            }
            var statusResponse;
            if(urlAltaUsr.length != 0){
                console.log("######### " +urlAltaUsr)
                fetch(urlAltaUsr,{
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(object)})
                .then(response => {
                    if(response.status == 201){
                        console.log("usuario creado");
                        console.log(response.json());
                        setSuccessMessage("Usuario creado satisfactoriamente.");
                    }else{
                        setErrorMsg("No fue posible crear el usuario.")
                    }
                });
            }
            
        } catch (e) {
            console.log("################## " + e);
            setErrorMsg("Acceso incorrecto, usuario o contraseña incorrectos, inténtelo de nuevo")
        }
    }

    return (
        <>
            <div className="container-fluid">
                {isLoading && <Loader message={"loading"} />}
                <form
                    className='formulario'
                    onSubmit={doAlta}
                >
                    {/*SECCIÓN TITULO*/}
                    <div className="row">
                        <div className="col-md-12">
                            <p className="h4" style={{ textAlign: "center" }}>Alta de Usuario</p>
                        </div>
                    </div>
                    {/*FIN SECCIÓN TITULO*/}
                    <hr className="border-1"></hr>

                    {/*SECCIÓN NOMBRE COMPLETO*/}
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    name='nombre'
                                    id="nombre"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder='Introduce tu nombre'
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="paterno">
                                    Apellido paterno
                                </label>
                                <input
                                    name='paterno'
                                    id="paterno"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder='Introduce tu apellido paterno'
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="materno">
                                    Apellido Materno
                                </label>
                                <input
                                    name='materno'
                                    id="materno"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder='Introduce tu appellido materno'
                                />
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    {/*FIN SECCIÓN NOMBRE*/}

                    <div className="row">
                        <div className="col-md-1"></div>
                        {/* correo input */}
                        <div className="col-md-4">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="correo">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    id="email"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder='Introduce tu correo'
                                />
                            </div>
                        </div>
                        {/* usuario celular */}
                        <div className="col-md-3">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example2">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name='celular'
                                    id="celular"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder="(Código de área) Número"
                                />
                            </div>
                        </div>
                        {/* perfil */}
                        <div className="col-md-3">
                            <div className="form-outline input-group mb-4">
                                <label className="form-label " htmlFor="form2Example2">
                                    Perfil
                                    <select className="form-select border border-black border-2" onChange={handleInputChange} name="perfil" id="perfil" >
                                        <option defaultValue value={0}>Perfil...</option>
                                        <option value={1}>Alumno</option>
                                        <option value={2}>Profesor</option>
                                        <option value={3}>Administrador</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        {/* usuario input */}
                        <div className="col-md-4">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example2">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    name='usuario'
                                    id="usuario"
                                    onChange={handleInputChange}
                                    className="form-control border border-black border-2"
                                    placeholder='Introduce tu usuario'
                                />
                            </div>
                        </div>
                        {/* Password input */}
                        <div className="col-md-3">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    id="password"
                                    className="form-control border border-black border-2"
                                    onChange={handleInputChange}
                                    placeholder='Introduce tu password'
                                />
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-1"></div>
                    </div>
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
                                <Link to='/admin/home'>
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

export default AltaUsuario