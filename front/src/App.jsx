import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import Login from './components/routes/Login';
import AltaCurso from './components/routes/AltaCurso';
import Footer from './components/footer';
import Heather from './components/heather';
import LayoutProfesor from './components/routes/LayoutProfesor';
import LayoutAlumno from './components/routes/LayoutAlumno';
import Navbar from './components/Nav/Navbar';
import GetCursos from './components/cursos/GetCursos';
import DetailCursos from './components/cursos/DetailCursos';
import DetailModulos from './components/modulos/DetailModulos';
import DetailActividades from './components/actividades/DetailActividades';
import Navbarr from './components/Nav/Navbar';

function App() {

  localStorage.setItem('@user', JSON.stringify({email: "admin@admin.com", role:"admin"}))
  let user = localStorage.getItem('@user');
  user = JSON.parse(user)
 
  console.log('desde App con routes: ' + JSON.stringify(user));


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
        {/*fin del módulo de alumno */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
