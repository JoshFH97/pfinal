import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

function ColorSchemesExample() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand onClick={()=>navigate("/")}>MovileSmart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/Productos')}>Products</Nav.Link>
            <Nav.Link onClick={()=>navigate('/Contacto')}>Contact</Nav.Link>
            <Nav.Link onClick={()=>navigate('/Login')}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default ColorSchemesExample;
