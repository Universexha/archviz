import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Funcionalidad del carrusel
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const carousel = document.querySelector('.carousel');

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
});
