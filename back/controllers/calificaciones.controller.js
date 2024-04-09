//import model
const [DataTypes, sequelize] = require("../SQL/sql.connection.platvirt");

const CatCursos = require("../models/catcurso.model");
const Profesor = require("../models/profesor.model");
const CursoAlumno = require("../models/curso_alumno.model");
const Alumno = require("../models/alumno.model");
const Modulo = require("../models/modulo.model");
const Calificacion = require("../models/calificaciones.model");
const Entrega = require("../models/entregas.model");
const Actividad = require("../models/actividades.model");


module.exports.listar_calificacion = (req, res, next) => {
    //console.log(req.body)
    Calificacion.findAll(   
        { 
            //where: {id_curso: 2 },
            include: {
                model: Entrega,
                as:'entrega_actividades',
                //required:true,
                include:[
                    {
                        model:Alumno,
                        as:'alumno'
                    },
                    {
                        model:Actividad,
                        as: 'actividades'
                    }
                ]   
            }, 
            //attributes:['id_Calificacion','id_curso','nombre_Calificacion',], 
            //raw:true
        }
        ).then(response => {
            //acceder valores dentro de la asociacion
            //console.log(response[3].dataValues.cat_cursos.dataValues.titulo)
            console.log(response)
            return res.status(200).json(response)
            //res.send("listando cursos desde SQL")
        })
        .catch((error) => {
            return res.status(400).json({message: `Error listando calificacion : ${error.message}`});
        });
     
};

module.exports.crear_calificacion = (req, res, next) => {
    //console.log(req.body)
    const id_entrega = req.params.id_entrega
    const body = req.body;
    body.id_entrega = id_entrega
    console.log(body)

    //crear nuevo curso
    Entrega.findOne({where: {id_entrega: id_entrega}})
    .then(entrega =>{
        if(entrega === null){
            throw new Error("La Entrega mencionada no existe")
        }
        Calificacion.create(body)
    }).then(calificacion => {
        if(calificacion === null){
            throw new Error("No se pudo crear la Calificacion")
        }
        return res.status(201).json( {message:`Calificaión Creada`} )
    })
    .catch((error) =>{
        return res.status(400).json({ message: `Error creando calificacion: ${error.message}`});
    })
     
};

module.exports.editar_calificaciones =(req, res, next) =>{
    const id = req.params.id;
    Calificacion.update(req.body,{
        where:{id_calificacion: id}
    }).then(value => {
        if(value == 0){
            return res.status(400).json({message:"Calificacion no fue actualizado"})
        }else{
            return res.status(200).json({message: "Datos de la Calificacion fueron actualizado."});
        }
    }).catch(error =>{
        return res.status(500).json({message: "Error actualizando Calificacion "+ error.message});
    });

};

module.exports.eliminar_calificaciones = (req, res, next) => {
    const id = req.params.id
    Calificacion.destroy({
        where: {
                id_calificacion: id 
               }
    }).then(rowDeleted => {
        if(rowDeleted === 0){
            return res.status(404).json({message: "Calificacion no existe"});
        } else {
            console.log("Calificacion fue eliminada")
            return res.status(200).json({message: "Calificacion fue eliminada"});
        }
    }) // rowDeleted will return number of rows deleted
    .catch((error) =>{
        return res.status(400).json({ message: `Error eliminando Calificacion: ${error.message}`});
    })
};

module.exports.bulk_calificacion = (req, res, next) => {
    let bulk = [
        {
            "id_entrega": 1,
            "calificacion": 9.5,
            "comentario_calificacion": "muy bien",
        },
        {
            "id_entrega": 2,
            "calificacion": 9.5,
            "comentario_calificacion": "muy bien",
        },
        {
            "id_entrega": 3,
            "calificacion": 9.5,
            "comentario_calificacion": "muy bien",
        },
        
        ]
    //crear nueva curso
    Calificacion.bulkCreate(bulk)
    .then((curso) => {
        return res.status(201).json( { curso:curso } )
    })
    .catch((error) =>{
        return res.status(400).json({ message: `Error creando calificaciones: ${error}`});
    })
    
};

module.exports.calificaciones = (req, res, next) => {
    //console.log(req.body)
    const id_alumno = req.params.id_alumno
    /* CatCursos.findAll(
        { 
            attributes: ["id_curso","titulo"],
            include:
                [
                    {
                        model: Modulo,
                        as: 'modulos',
                        attributes: ["id_modulo","nombre_modulo"],
                        raw: true,
                        include:[
                            {
                            model: Actividad,
                            as:'actividades', 
                            attributes: ["id_actividad","nombre_actividad", "ponderacion_actividad"],
                            raw: true,
                            include:[
                                {
                                    model: Entrega,
                                    as: 'entrega_actividades',
                                    attributes: ["id_entrega","id_alumno"],
                                    where: {id_alumno: id_alumno},
                                    raw: true,
                                    include:[
                                        {
                                            model: Calificacion,
                                            as: 'calificaciones',
                                            attributes: ["id_calificacion","calificacion"],
                                            raw: true,
                                        }
                                    ]
                                }
                            ]
                            }
                        ]       
                    },
                ], 
            }
        ) */
                CatCursos.findAll({
                    attributes: ["id_curso", "titulo"],
                    include: [{
                      model: Modulo,
                      as: 'modulos',
                      attributes: ["id_modulo", "nombre_modulo"],
                      include: [{
                        model: Actividad,
                        as: 'actividades',
                        attributes: ["id_actividad", "nombre_actividad", "ponderacion_actividad"],
                        include: [{
                          model: Entrega,
                          as: 'entrega_actividades',
                          attributes: ["id_entrega", "id_alumno"],
                          where: { id_alumno: id_alumno }, // Filtro para el alumno específico
                          include: [{
                            model: Calificacion,
                            as: 'calificaciones',
                            attributes: ["id_calificacion", "calificacion"]
                          }]
                        }]
                      }]
                    }]
                  }).then(response => {
            //console.log(response)
            return res.status(200).json(response)
            //res.send("listando cursos desde SQL")
        })
        .catch((error) => {
            return res.status(400).json({message: `Error listando cursos : ${error.message}`});
        });
     
};
