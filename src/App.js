import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

import Tokens from "./components/pages/Tokens";
import Home from "./components/pages/Home";

  const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tokens" element={<Tokens />} />

      </Routes>
    </Router>
    
  );
}

export default App;

