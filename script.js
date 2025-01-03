//Encabezado de transparente a color
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#main-header");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  });

//Somos archviz animación
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
});

//Galeria, carrusel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");

  // Cargar datos desde JSON
  fetch("proyectos.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((proyecto) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        item.innerHTML = `
          <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
          <p>${proyecto.titulo}</p>
        `;
        track.appendChild(item);
      });

      // Inicializar el carrusel
      let currentIndex = 0;
      const items = document.querySelectorAll(".carousel-item");
      const totalItems = items.length;

      const moveToItem = (index) => {
        const itemWidth = items[0].clientWidth + 20; // Incluye margen
        track.style.transform = `translateX(-${index * itemWidth}px)`;
      };

      const autoScroll = () => {
        currentIndex = (currentIndex + 1) % totalItems;
        moveToItem(currentIndex);
      };

      let autoScrollInterval = setInterval(autoScroll, 3000);

      prevButton.addEventListener("click", () => {
        clearInterval(autoScrollInterval);
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        moveToItem(currentIndex);
        autoScrollInterval = setInterval(autoScroll, 3000);
      });

      nextButton.addEventListener("click", () => {
        clearInterval(autoScrollInterval);
        currentIndex = (currentIndex + 1) % totalItems;
        moveToItem(currentIndex);
        autoScrollInterval = setInterval(autoScroll, 3000);
      });
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
});

//Para cargar los proyectos desde proyectos.json a proyectos.html
document.addEventListener("DOMContentLoaded", () => {
  const proyectosContainer = document.getElementById("proyectos-container");

  if (proyectosContainer) {
    fetch("proyectos.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((proyecto) => {
          const proyectoCard = document.createElement("div");
          proyectoCard.classList.add("gallery-item");

          proyectoCard.innerHTML = `
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
            <h2>${proyecto.titulo}</h2>
            <p>${proyecto.descripcion}</p>
          `;

          proyectosContainer.appendChild(proyectoCard);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los proyectos:", error);
      });
  }
});
