import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
                <>
                    <Nav.Link as={Link} to='/login'> Login </Nav.Link>
                    <Nav.Link as={Link} to='/signup'> Sign Up</Nav.Link>
                </>
            )}
            { user && (
                <>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
            )}    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

