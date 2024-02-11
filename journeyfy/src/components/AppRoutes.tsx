import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import Destination from "./pages/destination/destination";
import Home from "./pages/home/Home";
import { Requests } from "./pages/requests/Requests";
import { ProtectedRoute } from "./layout/ProtectedRoute";
import { Role } from "../enums/roles";

//const cityCoverImageURL =
 // "https://media.cntraveler.com/photos/64c2a8052e6469f8103691aa/4:3/w_4920,h_3690,c_limit/Amsterdam-Took-a-Big-Step-Toward-Banning-Cruise-Ships-From-the-City-Center_GettyImages-1394428970.jpg";

const AppRoutes: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="destination/:destinationId" element={<Destination />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </Router>
  </>
);

export default AppRoutes;
