import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";

dayjs.locale("es")

function Calendario() {

    const localizer = dayjsLocalizer(dayjs)
    const eventos = [
        {
            start: dayjs('2024-05-12T12:00:00').toDate(),
            end: dayjs('2024-05-12T13:30:00').toDate(),
            title: "Presentación"
        },
        {
            start: dayjs('2024-04-28T17:00:00').toDate(),
            end: dayjs('2024-04-28T18:00:00').toDate(),
            title: "Sesión Módulo 2"
        },
        {
            start: dayjs('2024-06-11T11:00:00').toDate(),
            end: dayjs('2024-06-11T12:00:00').toDate(),
            title: "Videoconferencia"
        },
        {
            start: dayjs('2024-06-14T18:00:00').toDate(),
            end: dayjs('2024-06-14T19:00:00').toDate(),
            title: "Examen Módulo 2"
        }
    ]

    return (
        <>
            {/*CONTENEDOR PRINCIPAL*/}
            <div className="container-fluid">
                {/*SECCIÓN TITULO*/}
                <div className="row">
                    <div className="col-md-10">
                        <p className="h4" style={{ textAlign: "center" }}>Calendario</p>
                        <hr className="border-1"></hr>
                    </div>
                </div>
                {/*FIN SECCIÓN TITULO*/}
                

                <div className="row">
                    <div className="col-md-10" style={{ height: "65vh"}}>
                        <Calendar
                            localizer={localizer}
                            events={eventos}
                            min={dayjs('2023-12-23T08:00:00').toDate()}
                            max={dayjs('2023-12-23T20:00:00').toDate()}
                            //views={["month","day"]}
                            //defaultView='day'
                            //view='day'
                        />
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>{/*FIN CONTENEDOR PRINCIPAL*/}
        </>

    )
}

export default Calendario