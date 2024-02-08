import { createContext, useState } from "react";
import { Container, Dropdown, Nav, Navbar, SplitButton } from "react-bootstrap";
import { User } from "../../../models/user";
import { AuthApiService } from "../../../services/authApiService";
import { userInfoSelector } from "../../../utils/selectors";
import { Login } from "../../presentationals/login/Login";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../enums/roles";

interface IUserContext {
  user: User | null;
  setUser: (val: User) => void;
}
export const UserContext = createContext<IUserContext>(null!);

export const MyNavbar = () => {
  const [user, setUser] = useState(userInfoSelector);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthApiService.logout().then(() => {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    });
  };

  return (
    <Navbar fixed="top" className="shadow-sm" bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand href="/">Journeyfy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && user.role <= Role.Mod && (
              <Nav.Link href="/requests">Richieste</Nav.Link>
            )}
          </Nav>
          <UserContext.Provider value={{ user, setUser }}>
            {user ? (
              <SplitButton
                id="user-dropdown"
                variant="success"
                title={user.displayName}
                align={"end"}
              >
                <Dropdown.Item eventKey="1" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </SplitButton>
            ) : (
              <Dropdown id="signin-dropdown">
                <Dropdown.Toggle variant="primary">Accedi</Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Login />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </UserContext.Provider>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
