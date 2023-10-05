"use strict";

let cardWidth = 310;
let seccionCarrousel = 0;

function slideIzq(btnIzq) {
    if(seccionCarrousel != 0) {
        seccionCarrousel += 5;
    } else {
        seccionCarrousel = -10;
    }
    let slide = seccionCarrousel * cardWidth;
    let aux = btnIzq.nextElementSibling;
    let carrousel = aux.firstElementChild;
    carrousel.style.transform = `translateX(${slide}px)`;
}

function slideDer(btnDer) {
    if(seccionCarrousel >= -5) {
        seccionCarrousel -= 5;
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