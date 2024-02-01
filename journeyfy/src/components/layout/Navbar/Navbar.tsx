import { Container, Navbar, Dropdown } from "react-bootstrap";
import { Login } from "../../presentationals/login/Login";

export const MyNavbar = () => {
  const user = null;

  return (
    <Navbar fixed="top" className="shadow-sm" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">Journeyfy</Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="signin-dropdown">
            Accedi
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Login/>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};
