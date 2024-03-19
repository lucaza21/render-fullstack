const express = require("express");
const router = express.Router();

//import users controller
const catCursos = require("../controllers/catcursos.controller");
const middleware = require("../middlewares/secure.middleware")

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get("/listar", catCursos.listar_catCursos);
router.get("/bulk", catCursos.bulk_catCursos);
router.get("/detalle/:id", catCursos.detalle_catCursos);
router.post("/crear/:id", catCursos.crear_catCursos);
router.post("/subir/:id", upload.single('file'), catCursos.subirArchivos);
router.put("/editar/:id", catCursos.editar_catcurso);
router.delete("/eliminar/:id", catCursos.eliminar_catCursos);

/* router.post("/login", alumnos.login_alumnos);
router.post("/crear", alumnos.crear_alumno);

router.delete("/eliminar/:id", alumnos.eliminar_alumno); */


/*
router.get("/api/users/:id", users.detail);
router.patch("/api/users/:id", middleware.checkAuth, users.update);
router.get("/api/filter", users.filter); */

router.get("/", (req, res) => {
    res.json({ message: "Hello desde Alumnos" })
})


module.exports = router;