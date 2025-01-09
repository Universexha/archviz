import React from 'react';
import logo from '../assets/imagenes/sinFondo-logo-temporal-blanco.png'; // Ruta al logo

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo ARCHVIZ" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li><a href="#proyectos" style={styles.navLink}>Proyectos</a></li>
          <li><a href="#recursos" style={styles.navLink}>Recursos</a></li>
          <li><a href="#cursos" style={styles.navLink}>Cursos</a></li>
          <li><a href="#videos" style={styles.navLink}>Videos</a></li>
          <li><a href="#nosotros" style={styles.navLink}>Nosotros</a></li>
        </ul>
      </nav>
      <button style={styles.loginButton}>Iniciar sesión</button>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
    position: 'relative',
    zIndex: 1000,
  },
  logoContainer: {
    flex: '0 0 auto',
  },
  logo: {
    height: '40px',
  },
  nav: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center', // Centra los botones
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    position: 'relative',
  },
  loginButton: {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Header;
