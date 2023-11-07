"use strict";

let cardWidth = 210;
let seccionCarrousel = 0;

function slideIzq(btnIzq) {
    if(seccionCarrousel != 0) {
        seccionCarrousel += 4;
    } else {
        seccionCarrousel = -8;
    }
    let slide = seccionCarrousel * cardWidth;
    let aux = btnIzq.nextElementSibling;
    let carrousel = aux.firstElementChild;
    carrousel.style.transform = `translateX(${slide}px)`;
}

function slideDer(btnDer) {
    if(seccionCarrousel >= -4) {
        seccionCarrousel -= 4;
    } else {
        seccionCarrousel = 0;
    }
    let slide = seccionCarrousel * cardWidth;
    let aux = btnDer.previousElementSibling;
    let carrousel = aux.firstElementChild;
    carrousel.style.transform = `translateX(${slide}px)`;
}

document.body.classList.add('no-scroll', 'preloader-active');

const preloader = document.querySelector('.preloader');
const percentageElement = document.querySelector('.percentage');

let percentage = 0;
const interval = setInterval(function() {
  percentage += 1;
  percentageElement.innerText = percentage + "%";

  if (percentage === 100) {
    clearInterval(interval);
    setTimeout(function() {
      preloader.classList.add('hide');
      document.body.classList.remove('no-scroll', 'preloader-active');
      document.querySelector('.contenido').style.display = 'block';
    }, 2500); // Duración total del preloader y el porcentaje
  }
}, 25);

document.addEventListener("DOMContentLoaded", function () {
  const mySwiper = new Swiper(".swiper-container", {
    // Opciones de configuración aquí
    loop: true, // Permite desplazarse de manera infinita
    pagination: {
      el: ".swiper-pagination", // Elemento de paginación
    },
  });
});

