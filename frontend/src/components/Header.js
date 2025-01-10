import React from "react";
import logo from "../assets/imagenes/sinFondo-logo-temporal-blanco.png"; // Ruta del logo
import "./Header.css"; // Archivo CSS para estilos del encabezado

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo ARCHVIZ" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a href="/projects" className="nav-link">
              Proyectos
            </a>
          </li>
          <li className="nav-item">
            <a href="/resources" className="nav-link">
              Recursos
            </a>
          </li>
          <li className="nav-item">
            <a href="/courses" className="nav-link">
              Cursos
            </a>
          </li>
          <li className="nav-item">
            <a href="/videos" className="nav-link">
              Videos
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              Nosotros
            </a>
          </li>
        </ul>
      </nav>
      <div className="login-container">
        <button className="login-button">Iniciar Sesión</button>
      </div>
    </header>
  );
}

export default Header;
