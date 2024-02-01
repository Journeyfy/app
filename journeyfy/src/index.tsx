import { createRoot } from "react-dom/client";
import "../node_modules/dolfo/comps/shared/styles/_dolfo.scss";
import { axiosBuilder } from "./axiosBuilder";
import AppRoutes from "./components/AppRoutes";
import "./index.css";

export const axiosInstance = axiosBuilder(
  "https://journeyfy-api.onrender.com/api/v1/"
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppRoutes />);
