import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import Login from './components/routes/Login';
import AltaCurso from './components/routes/AltaCurso';
import Footer from './components/footer';
import Heather from './components/heather';
import LayoutProfesor from './components/routes/LayoutProfesor';
import LayoutAlumno from './components/routes/LayoutAlumno';

import GetCursos from './components/cursos/GetCursos';
import DetailCursos from './components/cursos/DetailCursos';
import DetailModulos from './components/modulos/DetailModulos';
import DetailActividades from './components/actividades/DetailActividades';
import Navbarr from './components/Nav/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CargarArch from './components/CargarArch/CargarArch';
import Calificaciones from './components/Calificaciones/Calificaciones';

function App() {

/*   localStorage.setItem('@user', JSON.stringify({
    logedUser: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTcxMjQ1NzYzNi4wNCwiaWF0IjoxNzEyNDU0MDM2fQ.xp7J8j10HVRd7-4CD97AQTRSzwZhAoGS3aNWXm5r8uE",
        alumno: {
            id_alumno: 1,
            usuario: "user_alumno1",
            correo: "alumno1@platf.com"
        }
    }
}))

  let user = localStorage.getItem('@user');
  user = JSON.parse(user)
 
  console.log('desde App con routes: ' + JSON.stringify(user)); */


  return (
    <Router>
      <Heather/>
      {/* <Navbarr /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />  
        <Route
          path="profesor"
          element={
            <PrivateRoute>
              <LayoutProfesor/>
            </PrivateRoute>
          }
        />
        {/*módulo de alumno */}
        <Route
          path="alumno"
          element={
            <PrivateRoute>
              <Navbarr/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <Navbarr/>
              <GetCursos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cursosDetail/:id_curso"
          element={
            <PrivateRoute>
              <DetailCursos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/modulosDetail/:id_modulo"
          element={
            <PrivateRoute>
              <DetailModulos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/actividadesDetail/:id_actividad"
          element={
            <PrivateRoute>
              <DetailActividades/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cargar/:id_actividad"
          element={
            <PrivateRoute>
              <CargarArch />
            </PrivateRoute>
          }
        />
        <Route
          path="/calificaciones"
          element={
            <PrivateRoute>
              <Calificaciones />
            </PrivateRoute>
          }
        />
        
        {/*fin del módulo de alumno */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
