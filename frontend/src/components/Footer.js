import React from "react";
import "./Footer.css"; // Si deseas agregar estilos al footer
import facebookIcon from "../assets/imagenes/iconos/facebook.png";
import instagramIcon from "../assets/imagenes/iconos/instagram.png";
import pinterestIcon from "../assets/imagenes/iconos/pinterest.png";
import youtubeIcon from "../assets/imagenes/iconos/youtube.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="social-icons">
          <a href="#" className="icon">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="#" className="icon">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="#" className="icon">
            <img src={pinterestIcon} alt="Pinterest" />
          </a>
          <a href="#" className="icon">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 ARCHVIZ. Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
