import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ColorSchemesExample() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({ name: 'Joshua Ferreto', email: 'johndoe@example.com' });

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Buscar:', searchQuery);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    localStorage.clear()
    setUser(null);
    navigate('/Login');
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>MovileSmart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/Productos')}>Products</Nav.Link>
            <Nav.Link onClick={() => navigate('/Contacto')}>Contact</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <Nav>
            {user ? (
              <NavDropdown title={user.name} id="user-dropdown">
                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/settings')}>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={() => navigate('/Login')}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
