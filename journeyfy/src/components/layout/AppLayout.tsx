import { Outlet } from "react-router-dom";
import { MyNavbar } from "./Navbar/Navbar";
import { User } from "../../models/user";
import { createContext, useState } from "react";
import { userInfoSelector } from "../../utils/selectors";

interface IUserContext {
  user: User | null;
  setUser: (val: User | null) => void;
}
export const UserContext = createContext<IUserContext>(null!);

export const AppLayout = () => {
  const [user, setUser] = useState(userInfoSelector);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <MyNavbar />
      <Outlet />
    </UserContext.Provider>
  );
};
