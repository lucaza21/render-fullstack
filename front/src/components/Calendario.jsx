
function Calendario() {
    return (
        <>
            {/*CONTENEDOR PRINCIPAL*/}
            <div className="container-fluid">
                {/*SECCIÓN TITULO*/}
                <div className="row">
                    <div className="col-md-12">
                        <p className="h4" style={{ textAlign: "center" }}>Calendario</p>
                    </div>
                </div>
                {/*FIN SECCIÓN TITULO*/}
                <hr className="border-1"></hr>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10"></div>
                    <div className="col-md-1"></div>
                </div>

            </div>{/*FIN CONTENEDOR PRINCIPAL*/}
        </>

    )
}

export default Calendario