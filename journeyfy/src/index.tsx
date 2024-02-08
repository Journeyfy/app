import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/dolfo/comps/shared/styles/_dolfo.scss";
import "./index.scss";
import { createRoot } from "react-dom/client";
import { axiosBuilder } from "./axiosBuilder";
import AppRoutes from "./components/AppRoutes";

export const axiosInstance = axiosBuilder(
  "http://localhost:5050/api/v1"
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppRoutes />);
