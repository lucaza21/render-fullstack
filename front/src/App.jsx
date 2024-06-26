import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import Login from './components/routes/Login';

import Footer from './components/footer';
import Heather from './components/heather';
import LayoutProfesor from './components/routes/LayoutProfesor';
import LayoutAlumno from './components/routes/LayoutAlumno';

import GetCursos from './components/cursos/GetCursos';
import DetailCursos from './components/cursos/DetailCursos';
import DetailModulos from './components/modulos/DetailModulos';
import DetailActividades from './components/actividades/DetailActividades';
import Navbarr from './components/Nav/Navbar';

import CargarArch from './components/CargarArch/CargarArch';
import Calificaciones from './components/Calificaciones/Calificaciones';
import LayoutAdmin from './components/routes/LayoutAdmin';
import ContentCalificacion from './components/profesor/content/ContentCalificacion';

function App() {

  return (
    <Router>
    
      <Heather/>
      <div className="">
      {/* <Navbarr /> */}
      <Routes>
        <Route
            path="admin/*"
            element={
              <PrivateRoute>
                <LayoutAdmin />
              </PrivateRoute>
            }
        />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notas/:id_entrega" element={<ContentCalificacion />} /> 
        <Route
          path="/profesor/*"
          element={
            <PrivateRoute >
              <LayoutProfesor/>
            </PrivateRoute>
          }
        />
        {/*módulo de alumno */}
        <Route
          path="alumno"
          element={
            <PrivateRoute >
              <Navbarr/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <Navbarr />
              <GetCursos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cursosDetail/:id_curso"
          element={
            <PrivateRoute>
              <Navbarr />
              <DetailCursos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/modulosDetail/:id_modulo"
          element={
            <PrivateRoute>
              <Navbarr/>
              <DetailModulos/>
            </PrivateRoute>
          }
        />
        <Route
          path="/actividadesDetail/:id_actividad"
          element={
            <PrivateRoute>
              <Navbarr/>
              <DetailActividades/>
            </PrivateRoute>
          }
        />
        <Route
          path="/cargar/:id_actividad"
          element={
            <PrivateRoute>
              <Navbarr/>
              <CargarArch />
            </PrivateRoute>
          }
        />
        <Route
          path="/calificaciones"
          element={
            <PrivateRoute>
              <Navbarr/>
              <Calificaciones />
            </PrivateRoute>
          }
        />
        
        {/*fin del módulo de alumno */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App