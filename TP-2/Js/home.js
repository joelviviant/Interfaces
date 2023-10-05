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

setTimeout(function() {
  document.querySelector('.preloader').classList.add('hide');


  document.body.classList.remove('no-scroll', 'preloader-active');

  document.querySelector('.contenido').style.display = 'block';
}, 5000);