import DataTable from 'react-data-table-component';
import actividad from '../../assets/iconos/registro.png'
import { Record } from 'react-bootstrap-icons';
import { useState } from 'react';

function ListaCursos() {

    const columns = [
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
            name: 'Acciones',
            selector: row => <img width={15} height={15} src={actividad} />,
        },
        {
            name: 'Acciones',
            cell: row => <button className='btn btn-primary'>Actividades</button>
            //selector: row => <img width={15} height={15} src={eliminar}/>,
        },
    ];

    const datos = [
        {
            titulo: 'Curso 1',
            diseñador: 'Ana Laura',
            objetivo: 'Realizar un proyecto ejecutivo',
            introduccion: 'Sin descripción',
            metodologia: 'Sin metodología',
            perfil: 'Lic. Informática',
            insumos: 'Sin insumos',
            evaluacion: 'Sin evaluación',
            horas: '20',
            semanas: '3',
            materialCurso: 'C:\fakepath\Anexos TFM PLATAFORMA VIRTUAL.pdf'
        },
        {
            titulo: 'Curso 2',
            diseñador: 'Ana Laura',
            objetivo: 'Realizar un proyecto ejecutivo',
            introduccion: 'Sin descripción',
            metodologia: 'Sin metodología',
            perfil: 'Lic. Informática',
            insumos: 'Los insumos vienen en la carta descriptiva',
            evaluacion: 'Sin evaluación',
            horas: '20',
            semanas: '3',
            materialCurso: 'C:\fakepath\Anexos TFM PLATAFORMA VIRTUAL.pdf'
        },
    ]

    const [records,setRecords]=useState(datos)

    const paginacionOpciones = {
        rowsPerPageText: 'filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
    }

    const handleChange = (e) => {
        const datosFiltrados = datos.filter(record => {
            return record.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(datosFiltrados)
    }

    return (
        <>
            {/*CONTENEDOR PRINCIPAL*/}
            <div className="container-fluid">
                {/*SECCIÓN TITULO*/}
                <div className="row">
                    <div className="col-md-12">
                        <p className="h4" style={{ textAlign: "center" }}>Listado de Cursos</p>
                    </div>
                </div>
                {/*FIN SECCIÓN TITULO*/}
                <hr className="border-1"></hr>

                {/*<div className="row">
                    <div className="col-md-12">
                        <input type='text' onChange={handleChange} />
                    </div>
                </div>*/}

                <div className="row">
                    <div className="col-md-12">
                        {/*NUEVA TABLA*/}
                        <DataTable
                            columns={columns}
                            data={records}
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
        </>

    )
}

export default ListaCursos