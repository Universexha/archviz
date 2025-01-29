import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import LoginRegister from "./pages/LoginRegister";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta sin Header */}
        <Route path="/login" element={<LoginRegister />} />

        {/* Rutas con Header */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
