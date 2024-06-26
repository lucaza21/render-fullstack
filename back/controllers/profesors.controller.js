//import model
const [DataTypes, sequelize] = require("../SQL/sql.connection.platvirt");
const CatCurso = require("../models/catcurso.model");
const Profesor = require("../models/profesor.model");
const Modulo = require("../models/modulo.model");
const Entrega = require("../models/entregas.model");
const Actividad = require("../models/actividades.model");
const Calificacion = require("../models/calificaciones.model");
const Alumno = require("../models/alumno.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports.crear_profesor = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) =>{
        req.body.password = hash;
        const body = req.body;
        //console.log(body)

        //crear nuevo profesor
        Profesor.create(body)
        .then((profesor) => {
            return res.status(201).json( { profesor:profesor } )
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error creando profesor: ${error.message}`});
        })
    })   
    
};

module.exports.login_profesor = (req, res) => { 
    Profesor.findOne({
        where: {correo: req.body.correo}
    })
    .then((profesor)=>{
        if(profesor){
            bcrypt.compare(req.body.password, profesor.password).then(match =>{
                if(match){
                    const token = jwt.sign(
                        {sub: profesor.id_profesor, exp: Date.now()/1000 + 3600},
                        "super-secret"
                    );
                    return res.json(
                        {
                            logedUser:
                                { 
                                    token:token, 
                                    user:{id:profesor.id_profesor, usuario: profesor.usuario, correo: profesor.correo} 
                                }
                        })
                    //return res.send({"match": match})
                }
                return res.status(401).json({message: "Unauthorized wrong password"})
            });
        } else{
            return res.status(401).json({message: "Unauthorized profesor doesnt exist"})
        }
    })
    .catch((error) =>{
        return res.status(400).json({ message: `Error listing profesor: ${error.message}`});
    }) 
};

module.exports.listar_profesor = (req, res, next) => {
    //console.log(req.body)
    Profesor.findAll(
        {   
            include:
                [{
                model: CatCurso,
                as: 'cat_cursos',
                attributes: ["titulo"]    
                }], 
            attributes:['id_profesor', 'nombre', 'ap_paterno', 'ap_materno', 'correo', 'celular', 'fecha_registro',
                        'usuario','password','status'],
            
        }
        ).then(response => {
            //console.log(response)
            return res.status(200).json(response)
            //res.send("listando Profesor desde SQL")
        })
    .catch((error) => {
        return res.status(400).json({message:`Error listando alumnos : ${error.message}`});
    });
     
};

module.exports.editar_profesor = (req, res, next) =>{
    const id_profesor = req.params.id;
    const body = req.body
    
    Profesor.findOne(
        { 
            where: {id_profesor: id_profesor}
        }).then(profesor => {
            if(profesor === null){
                throw new Error("El profesor mencionado no existe")
            }
            return Profesor.update( body,
                { 
                    where: {id_profesor: id_profesor}
                })
        }).then(updated => {
            if(updated == 0){
                return res.status(400).json({message: "El profesor no fue actualizado."});
            }else{
                return res.status(200).json({message: `Se han editado los datos del Profesor ${body.usuario}`});
            }
        }).catch(error => {
            return res.status(400).json({Error: `Error editando el profesor - ${error.name}: ${error.message}`});
        }) 
    /* Profesor.update(req.body, {
        where:{id_profesor: id}
    }).then(value =>{
        if(value == 0){
            return res.status(400).json({message: "No fue posible actualizar la actividad."});
        }else{
            return res.status(202).json({message: "La actividad fue actualizar."});
        }
    }).catch(error =>{
        return res.status(500).json({message: "Error al actualizar actividad " + error.message});
    }) */
};

module.exports.eliminar_profesor = (req, res, next) => {
    const id_profesor = req.params.id;
    Profesor.findOne(
        { 
            where: {id_profesor: id_profesor}
        }).then(profesor => {
            if(profesor === null){
                throw new Error("El profesor mencionado no existe")
            }
            return Profesor.destroy({
                where: {
                        id_profesor: id_profesor 
                       }
        })
    }).then(rowDeleted => {
        if(rowDeleted === 0){
            return res.status(404).json({message: "profesor no existe"});
        } 
        return res.status(204).json();
    }) // rowDeleted will return number of rows deleted
    .catch((error) =>{
        return res.status(400).json({ message: `Error eliminando profesor - ${error.name}: ${error.message}`});
    })


};

module.exports.bulk = (req, res, next) => {

    let bulk = [
            {
                nombre: "profesor1",
                ap_paterno: "apellidoP1",
                ap_materno: "apellidoM1",
                correo: "profesor1@platf.com",
                celular: "0123456789",
                fecha_registro:"2021-10-31 01:34:48.81+00",
                usuario: "user_profesor1",
                password: "secret"
            },
            {
                nombre: "profesor2",
                ap_paterno: "apellidoP2",
                ap_materno: "apellidoM2",
                correo: "profesor2@platf.com",
                celular: "0123456789",
                fecha_registro:"2021-10-31 01:34:48.81+00",
                usuario: "user_profesor2",
                password: "secret"
            },
            {
                nombre: "profesor3",
                ap_paterno: "apellidoP3",
                ap_materno: "apellidoM3",
                correo: "profesor3@platf.com",
                celular: "0123456789",
                fecha_registro:"2021-10-31 01:34:48.81+00",
                usuario: "user_profesor3",
                password: "secret"
            },
        ]
    //crear nueva profesor
    Profesor.bulkCreate(bulk)
    .then((profesor) => {
        return res.status(201).json( { profesor:profesor } )
    })
    .catch((error) =>{
        return res.status(400).json({ message: `Error creando profesores: ${error.message}`});
    })
    
};

/* // Define las relaciones entre los modelos
Profesor.hasMany(CatCurso, { foreignKey: 'id_profesor' });
CatCurso.hasMany(Modulo, { foreignKey: 'id_curso' });
Modulo.hasMany(Actividad, { foreignKey: 'id_modulo' });
Actividad.hasMany(Entrega, { foreignKey: 'id_actividad' }); */

module.exports.calificaciones = (req, res, next) => {
    //console.log(req.body)
    const id_profesor = req.params.id_profesor
    /* Entrega.findAll(
        { 
            attributes: ["id_entrega", "ruta_entrega"],
            //group:["id_actividad"],
            include:
                [
                    {
                        model: Actividad,
                        as:'actividades', 
                        attributes: ["id_actividad","nombre_actividad"],
                        //group:["id_modulo"],
                        raw: true,
                         include:[
                            {
                            model: Modulo,
                            as: 'modulos',
                            attributes: ["id_modulo","nombre_modulo"],
                            raw: true,
                            include:[
                                {
                                    model: CatCurso,
                                    as:'cat_cursos',
                                    attributes: ["id_curso","titulo"],
                                    raw: true,
                                    include:[
                                        {
                                            model: Profesor,
                                            as: 'profesor',
                                            where: {id_profesor: id_profesor},
                                            attributes: ["id_profesor","usuario"],
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
        /* CatCurso.findAll(
            { 
                attributes: ["id_profesor","titulo"],
                //where: {id_profesor: id_profesor},
                //attributes: ["id_entrega","id_actividad","id_alumno", "ruta_entrega"],
                //group:["id_actividad"],
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
                                attributes: ["id_modulo","id_actividad","nombre_actividad"],
                                group:["id_modulo"],
                                raw: true,
                                include:[
                                    {
                                        model: Entrega,
                                        as: 'entrega_actividades',
                                        //where: {id_profesor: id_profesor},
                                        //attributes: ["id_profesor","usuario"],
                                        raw: true,
                                        
                                    }
                                ]
                                }
                            ]      
                        },
                    ], 
                }
            ) */
            // Ahora podemos hacer la consulta
        Profesor.findAll({
            where: {id_profesor: id_profesor},
            include: [{
            model: CatCurso,
            as:'cat_cursos',
            include: [{
                model: Modulo,
                as:'modulos',
                include: [{
                model: Actividad,
                as:'actividades',
                include: [{
                    model: Entrega,
                    as:'entrega_actividades',
                    include: [{
                        model: Calificacion,
                        as:'calificaciones'
                        }]
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