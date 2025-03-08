import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Tour3D from "./components/Tour3D";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/recorrido" element={<Tour3D />} />
      </Routes>
    </div>
  );
}

export default App;

