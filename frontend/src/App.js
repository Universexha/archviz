import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMain(true), 3000); // Animación ajustada
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!showMain ? (
        <div className="animation-container">
          <div className="bar"></div>
        </div>
      ) : (
        <>
          <Header />
          <main className="main-content">
            <p className="intro-text">Descubre nuevas posibilidades en cada proyecto</p>
            <h1 className="main-title">Transforma Ideas en Realidad</h1>
          </main>

          <section className="project-carousel">
            <h2 className="project-title">Proyectos Destacados</h2>
            <div className="carousel-container">
              <button className="carousel-btn prev-btn">{'<'}</button>
              <div className="carousel">
                <div className="carousel-item">Proyecto 1</div>
                <div className="carousel-item">Proyecto 2</div>
                <div className="carousel-item">Proyecto 3</div>
                <div className="carousel-item">Proyecto 4</div>
              </div>
              <button className="carousel-btn next-btn">{'>'}</button>
            </div>
          </section>

          <section className="resources-section">
            <div className="resources-header">
              <h2 className="resources-title">Recursos</h2>
              <button className="explore-resources-btn">Explora nuestros recursos</button>
            </div>
            <div className="resources-gallery">
              <div className="resource-item">
                <img src="/path/to/image1.jpg" alt="Recurso 1" className="resource-image" />
                <h3 className="resource-name">Recurso 1</h3>
                <p className="resource-description">Descripción breve del recurso 1.</p>
                <p className="resource-cost">$20</p>
                <button className="download-btn">Descargar</button>
              </div>
              <div className="resource-item">
                <img src="/path/to/image2.jpg" alt="Recurso 2" className="resource-image" />
                <h3 className="resource-name">Recurso 2</h3>
                <p className="resource-description">Descripción breve del recurso 2.</p>
                <p className="resource-cost">$15</p>
                <button className="download-btn">Descargar</button>
              </div>
              <div className="resource-item">
                <img src="/path/to/image3.jpg" alt="Recurso 3" className="resource-image" />
                <h3 className="resource-name">Recurso 3</h3>
                <p className="resource-description">Descripción breve del recurso 3.</p>
                <p className="resource-cost">Gratis</p>
                <button className="download-btn">Descargar</button>
              </div>
              <div className="resource-item view-all">
                <h3 className="resource-name">Ver todos</h3>
              </div>
            </div>
          </section>

          <section className="courses-section">
            <div className="courses-header">
              <h2 className="courses-title">Nuestros Cursos</h2>
              <button className="explore-courses-btn">Explora nuestros cursos</button>
            </div>
            <div className="courses-gallery">
              <div className="course-item">Curso 1</div>
              <div className="course-item">Curso 2</div>
              <div className="course-item">Curso 3</div>
              <div className="course-item view-all">Ver todo</div>
            </div>
          </section>

          <section className="team-section">
            <div className="team-header">
              <h2 className="team-title">Ponga nuestra experiencia a trabajar para usted</h2>
              <button className="team-button">Conoce al equipo</button>
            </div>
            <div className="team-gallery">
              <div className="team-member">
                <img src="/path/to/member1.jpg" alt="Steven Rubio" className="team-image" />
                <h3 className="team-name">Steven Rubio</h3>
                <p className="team-role">Arquitecto + Fundador</p>
                <a href="https://www.linkedin.com" className="linkedin-icon">in</a>
            </div>
            <div className="team-member">
                <img src="/path/to/member2.jpg" alt="Juliet Suárez" className="team-image" />
                <h3 className="team-name">Juliet Suárez</h3>
                <p className="team-role">Artista + Ilustradora</p>
                <a href="https://www.linkedin.com" className="linkedin-icon">in</a>
            </div>
            <div className="team-member">
                <img src="/path/to/member3.jpg" alt="Sebastián Bustos" className="team-image" />
                <h3 className="team-name">Sebastián Bustos</h3>
                <p className="team-role">Arquitecto + Instructor</p>
                <a href="https://www.linkedin.com" className="linkedin-icon">in</a>
            </div>
            <div className="team-member">
               <img src="/path/to/member4.jpg" alt="Verónica Salguero" className="team-image" />
               <h3 className="team-name">Verónica Salguero</h3>
               <p className="team-role">Arquitecta + Ilustradora</p>
               <a href="https://www.linkedin.com" className="linkedin-icon">in</a>
            </div>
          </div>
        </section>

        <section className="youtube-section">
          <div className="youtube-header">
            <h2 className="youtube-title">
              Educando a arquitectos de todo el mundo sobre <span className="youtube-icon">▶</span>
            </h2>
            <p className="youtube-subtitle">Echa un vistazo a nuestra última subida:</p>
          </div>
          <div className="youtube-content">
            <div className="youtube-list">
              <div className="youtube-item">
                <img src="/path/to/image1.jpg" alt="Video 1" className="youtube-thumbnail" />
                <div className="youtube-details">
                  <h3 className="youtube-video-title">IA para arquitectos</h3>
                  <p className="youtube-description">Los mejores videos sobre IA y Arquitectura</p>
                </div>
                <button className="youtube-play-button">▶</button>
              </div>
              <div className="youtube-item">
                <img src="/path/to/image2.jpg" alt="Video 2" className="youtube-thumbnail" />
                <div className="youtube-details">
                  <h3 className="youtube-video-title">Tutoriales de renderizado</h3>
                  <p className="youtube-description">De la A a la Z en el renderizado de arquitectura</p>
                </div>
                <button className="youtube-play-button">▶</button>
              </div>
              <div className="youtube-item">
                <img src="/path/to/image3.jpg" alt="Video 3" className="youtube-thumbnail" />
                <div className="youtube-details">
                  <h3 className="youtube-video-title">Diagrama de arquitectura 101</h3>
                  <p className="youtube-description">Diagramas renderizados y animados...</p>
                </div>
                <button className="youtube-play-button">▶</button>
              </div>
              <div className="youtube-item">
                <img src="/path/to/image4.jpg" alt="Video 4" className="youtube-thumbnail" />
                <div className="youtube-details">
                  <h3 className="youtube-video-title">Serie de Portafolio</h3>
                  <p className="youtube-description">Crea un portafolio de arquitectura atractivo.</p>
                </div>
                <button className="youtube-play-button">▶</button>
              </div>
            </div>
            <div className="youtube-highlight">
              <img src="/path/to/highlight.jpg" alt="Última subida" className="highlight-thumbnail" />
              <button className="highlight-play-button">▶</button>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-box">
              <h3 className="contact-title">¿Quieres trabajar juntos?</h3>
              <p className="contact-text">Obtén una cotización en <a href="mailto:hello@archviz.com" className="contact-link">hello@archviz.com</a></p>
              <button className="contact-button">Habla con nosotros</button>
            </div>
            <div className="contact-box">
              <h3 className="contact-title">Conéctate con nosotros y aprende</h3>
              <div className="social-icons">
                <a href="#" className="icon">YouTube</a>
                <a href="#" className="icon">Instagram</a>
                <a href="#" className="icon">Pinterest</a>
              </div>
            </div>
            <div className="contact-box">
              <h3 className="contact-title">Suscríbete a nuestro boletín</h3>
              <p className="contact-text">¿Qué es lo que más te interesa?</p>
              <form className="newsletter-form">
                <div className="form-options">
                  <label><input type="checkbox" /> Descuentos</label>
                  <label><input type="checkbox" /> Cursos</label>
                  <label><input type="checkbox" /> Recursos</label>
                  <label><input type="checkbox" /> Tutoriales</label>
                </div>
                <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" />
                <button type="submit" className="newsletter-button">Suscribir</button>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-top">
            <div className="footer-column">
              <h4 className="footer-title">Compañía</h4>
              <ul className="footer-list">
                <li><a href="#about" className="footer-link">Sobre nosotros</a></li>
                <li><a href="#work" className="footer-link">Nuestro trabajo</a></li>
                <li><a href="#blog" className="footer-link">Blog</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Aprender</h4>
              <ul className="footer-list">
                <li><a href="#recursos" className="footer-link">Recursos</a></li>
                <li><a href="#cursos" className="footer-link">Cursos</a></li>
                <li><a href="#videos" className="footer-link">Videos</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Cosas aburridas</h4>
              <ul className="footer-list">
                <li><a href="#privacy" className="footer-link">Política de privacidad</a></li>
                <li><a href="#faq" className="footer-link">Preguntas frecuentes</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 ARCHVIZ. Todos los derechos reservados</p>
          </div>
        </footer>

        </>
      )}
    </div>
  );
}

export default App;
