import perfil from "../../assets/img/perfil_profesor.jpg";
import Notificaciones from "../ListaNotificaciones"
import Eventos from "../ListaEventos"


function HomeProfesor() {

    let user = localStorage.getItem('@user');
    let profesor = JSON.parse(user)
    
    //console.log('desde Calificaciones: ' + JSON.stringify(profesor));
    


    return (
        <>
            {/*CONTENEDOR PRINCIPAL DIVIDIDO EN 2*/}
            <div className="overflow-y-scroll container text-center" style={{height: "65vh", width: '930px'}}>
                {/*FILA CON SECCIÓN PERFIL */}
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        <div style={{ textAlign: "left" }}>
                            <img src={perfil} className="rounded-circle img-thumbnail" style={{ height: "80px", width: "80px" }} alt="Sin foto" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div style={{ textAlign: "left" }}>
                            <p className="fs-6 fw-medium text-uppercase" style={{ padding: "0px", margin: "0px" }}>{profesor.usuario}</p>
                            <p class="fw-lighter fs-6 text-lowercase" style={{ margin: "0px", padding: "0px" }}>{profesor.usuario}@gmail.com</p>
                            <p className="fw-lighter fs-6" style={{ padding: "0px", margin: "0px" }}>Profesor</p>
                        </div>
                    </div>
                </div>{/*FIN FILA CON SECCIÓN FOTO PERFIL */}
                <hr className="border-1"></hr>
                <div className="row ">
                    {/*SECCIÓN 1 DE NOTIFICACIONES */}
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col-md-12">
                                    <p className="h4" style={{ textAlign: "center", marginBottom:"20px" }}>Notificaciones</p>
                                </div>
                                <hr className="border-1 border-dark"></hr>
                                <div className="col-md-12">
                                    <Notificaciones />
                                </div>
                            </div>
                        </div>
                    </div>{/*FIN SECCIÓN 1 DE NOTIFICACIONES */}

                    {/******************************************************************* */}
                    {/*SECCIÓN 2 DE EVENTOS */}
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="h4" style={{ textAlign: "center", marginBottom:"20px" }}>Próximos Eventos</p>
                                </div>
                                <hr className="border-1 border-dark"></hr>
                            </div>
                            {/*SECCIÓN EVENTOS */}
                            <div className="row">
                                <div className="col-md-12">
                                    <Eventos />
                                </div>
                            </div>
                            {/*FIN SECCIÓN EVENTOS */}
                        </div>

                    </div>{/*FIN SECCIÓN 2 DE EVENTOS */}

                </div>
            </div>{/*FIN CONTENEDOR PRINCIPAL DIVIDIDO EN 2*/}
        </>

    )
}

export default HomeProfesor