import imagen1 from "../assets/eventos/evento1.png"
import imagen2 from "../assets/eventos/evento2.avif"
import imagen3 from "../assets/eventos/evento3.jpeg"

function ListaEventos() {
    return (
        <>
            <div className="card mb-3">
                <img src={imagen1} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Firma Convenio</h5>
                    <p className="card-text">
                    El objetivo es fortalecer la educación profesional en el ramo de la Ingeniería Automotriz y dotar de motores
                    </p>
                    <a href="#" className="card-link">
                        Ver más...
                    </a>
                </div>
            </div>

            {/*DESPUÉS ELIMINAR ESTAN REPETIDOS */}
            <div className="card mb-3">
                <img src={imagen2} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Conferencia Inteligencia Artificial</h5>
                    <p className="card-text">
                    La inteligencia artificial ayuda ya al opositor a estudiar con las reglas del tribunal
                    </p>
                    <a href="#" className="card-link">
                        Ver más...
                    </a>
                </div>
            </div>
            <div className="card mb-3">
                <img src={imagen3} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Convocatoria Curso en línea</h5>
                    <p className="card-text">
                    El objetivo es fortalecer la educación profesional en el ramo de la Ingeniería Automotriz y dotar de motores
                    </p>
                    <a href="#" className="card-link">
                        Ver más...
                    </a>
                </div>
            </div>
        </>
    )
}

export default ListaEventos