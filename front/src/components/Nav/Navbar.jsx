import { useState } from 'react';
import { Nav, NavDropdown} from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom'


function Navbarr() {


    let user = localStorage.getItem('@user');
    user = JSON.parse(user)
   
    console.log('desde MyNavbar: ' + JSON.stringify(user));

    const navigate = useNavigate()

    const logOut = () =>{
        navigate("/");
        localStorage.clear();
    }

  return (
    <>
   <Nav variant="pills" defaultActiveKey="/home" className='d-flex align-items-center justify-content-around'>
        {
            (user != null) ? 
            (<>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/cursos">Cursos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/calificaciones">Calificaciones</Nav.Link>
                </Nav.Item>
                
                {
                    (user) && (user.role=='admin') && (
                        <>
                        <Nav.Item>
                            {/* <Nav.Link as={NavLink} to="/addcoaster">Add Coaster</Nav.Link> */}
                        </Nav.Item>
                        </>
                    )
                }
            </>) : (<>
                
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav.Item>
                
            </>)
        }
        
      
      {
        (user != null) ? (
            <>
                <Nav.Item>
                    <Nav.Link >Hola {user.usuario}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  onClick={() => logOut()}>Logout</Nav.Link>
                </Nav.Item>
                </>
                ) : ( < > </>)
      }
      
    </Nav>
    </>
  )

}

export default Navbarr;