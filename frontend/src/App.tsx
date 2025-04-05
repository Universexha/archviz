import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/proyectos" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;

