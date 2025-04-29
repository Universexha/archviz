<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
      </Routes>
    </Router>
=======
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
>>>>>>> 224b53fdcdb6d82fc15c2c267c79aef87cb3dc4d
  );
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> 224b53fdcdb6d82fc15c2c267c79aef87cb3dc4d
