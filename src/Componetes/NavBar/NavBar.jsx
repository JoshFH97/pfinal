import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function ColorSchemesExample() {
  const navigate = useNavigate();

  // Simulación de usuario logueado
  const [user, setUser] = useState({ name: 'Joshua Ferreto', email: 'johndoe@example.com' });

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>MovileSmart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/Productos')}>Products</Nav.Link>
            <Nav.Link onClick={() => navigate('/Contacto')}>Contact</Nav.Link>
            <Nav.Link onClick={() => navigate('/Login')}>Login</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={user.name} id="user-dropdown">
              <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/settings')}>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => {
                // Aquí agregarías la lógica para cerrar sesión
                setUser(null); // Ejemplo de cerrar sesión
                navigate('/Login');
              }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;

