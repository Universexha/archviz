import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import Proyectos from "./pages/Proyectos";
import AdminPanel from "./components/admin/AdminPanel";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/lista-proyectos" element={<Proyectos />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;

