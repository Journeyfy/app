import { Outlet } from "react-router-dom";
import { MyNavbar } from "./Navbar/Navbar";

export const AppLayout = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};
