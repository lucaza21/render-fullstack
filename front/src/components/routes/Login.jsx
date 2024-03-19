import React from 'react'
import { useState } from 'react';
import img_login from "../img/img_login.jpg";
import { useNavigate } from 'react-router-dom';
import Loader from '../elements/Loader'
import useAutorizacion from '../../hooks/useAutorizacion';

function Login() {
    const navigate = useNavigate()
    const { login, isLoading } = useAutorizacion();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [perfil, setPerfil] = useState('alumno');
    const [errorMsg, setErrorMsg] = useState("")

    async function doLogin(event) {
        dismissError()
        event.preventDefault()
        let a = readyToSubmit();
        console.log("readytosubmit " + a)
        if (!readyToSubmit()) {
            setErrorMsg("Escriba un usuario y una contraseña válidos")
            return
        }
        try {
            await login(username, password, perfil)
            if (perfil === "alumno"){
                navigate("/alumno")
            } else if(perfil === "profesor"){
                navigate("/profesor")
            }            
        } catch (e) {
            setErrorMsg("Acceso incorrecto, usuario o contraseña incorrectos, inténtelo de nuevo")
        }
    }

    function onChangeAnyInput() {
        setErrorMsg("")
    }

    function onChangeUsername(e) {
        setUsername(e.target.value)
        console.log(e.target.value)
        onChangeAnyInput()
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
        onChangeAnyInput()
    }

    function onChangePerfil(e) {
        console.log("impresion on Change Perfil: "+e.target.value)
        setPerfil(e.target.value)
        onChangeAnyInput()
    }
   

    function readyToSubmit() {
        return username !== "" && password !== ""

    }

    function dismissError() {
        setErrorMsg("")
    }

    console.log(isLoading)
    return (
        <section className=" text-center text-lg-start">
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n    .rounded-t-5 {\n      border-top-left-radius: 0.5rem;\n      border-top-right-radius: 0.5rem;\n    }\n\n    @media (min-width: 992px) {\n      .rounded-tr-lg-0 {\n        border-top-right-radius: 0;\n      }\n\n      .rounded-bl-lg-5 {\n        border-bottom-left-radius: 0.5rem;\n      }\n    }\n  "
                }}
            />
            <div className="card mb-3">
                <div className="row g-0 d-flex align-items-center">
                    <div className="col-lg-4 d-none d-lg-flex">
                        <img
                            src={img_login}
                            alt="Imgen no disponible"
                            className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                        />
                    </div>
                    <div className="col-lg-8">
                        <div className="card-body py-5 px-md-5">
                            {isLoading && <Loader message={"loading"} />}
                            <form
                                className='formulario'
                                onSubmit={doLogin}
                            >
                                {/* Usuario input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example1">
                                        Usuario
                                    </label>
                                    <input
                                        name='usuario'
                                        id="form2Example1"
                                        className="form-control"
                                        value={username}
                                        onChange={onChangeUsername}
                                        placeholder='Introduce tu usuario'
                                    />
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        value={password}
                                        id="form2Example2"
                                        className="form-control"
                                        onChange={onChangePassword}
                                        placeholder='Introduce tu password'
                                    />
                                </div>

                                {/*Incluir radio button*/}
                                <div>
                                    <label className="form-label" htmlFor="form2Example2">
                                        Elegir el perfil de usuario
                                    </label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            defaultChecked
                                            id="alumno"
                                            name="perfil"
                                            type="radio"
                                            value="alumno"
                                            onChange={onChangePerfil}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault1"
                                        >
                                            Perfil Alumno
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            id="profesor"
                                            name="perfil"
                                            type="radio"
                                            value="profesor"
                                            onChange={onChangePerfil}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault2"
                                        >
                                            Perfil Profesor
                                        </label>
                                    </div>
                                </div>

                                {/* Submit button */}
                                <br></br>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Iniciar sesión
                                    </button>
                                </div>
                            </form>
                            {errorMsg && <div className="alert alert-danger" role="alert">
                                {errorMsg}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;