import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import User from "./components/pages/User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
