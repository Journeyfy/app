import { createContext, useState } from "react";
import { Container, Dropdown, Navbar, SplitButton } from "react-bootstrap";
import { User } from "../../../models/user";
import { AuthApiService } from "../../../services/authApiService";
import { userInfoSelector } from "../../../utils/selectors";
import { Login } from "../../presentationals/login/Login";

interface IUserContext {
  user: User | null;
  setUser: (val: User) => void;
}
export const UserContext = createContext<IUserContext>(null!);

export const MyNavbar = () => {
  const [user, setUser] = useState(userInfoSelector);

  const handleLogout = () => {
    AuthApiService.logout().then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <Navbar fixed="top" className="shadow-sm" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">Journeyfy</Navbar.Brand>
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
              <Dropdown.Toggle variant="primary" >
                Accedi
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Login />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </UserContext.Provider>
      </Container>
    </Navbar>
  );
};
