import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Destination from './pages/destination/destination';

const cityCoverImageURL = 'https://media.cntraveler.com/photos/64c2a8052e6469f8103691aa/4:3/w_4920,h_3690,c_limit/Amsterdam-Took-a-Big-Step-Toward-Banning-Cruise-Ships-From-the-City-Center_GettyImages-1394428970.jpg';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destination/2" element={<Destination cityName="Amsterdam" coverImage={cityCoverImageURL} />} />
    </Routes>
  </Router>
);

export default AppRoutes;