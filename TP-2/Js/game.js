"use strict";

//Abrir PopUp Compartir
let btnAbrirComp = document.getElementById('btn-abrir-compartir');
btnAbrirComp.addEventListener('click', abrirPopCompartir);
let popUpCompartir = document.querySelector('.compartir-pop');

//Cerrar PopUp Compartir
document.querySelector('.btn-cerrar-compartir').addEventListener('click', cerrarPopCompartir);
document.querySelector('.cerrar-compartir-pop').addEventListener('click', cerrarPopCompartir);

function abrirPopCompartir() {
    popUpCompartir.classList.add('abrir');
    document.querySelector('.cerrar-compartir-pop').classList.add('mostrar');
}

function cerrarPopCompartir() {
    popUpCompartir.classList.remove('abrir');
    document.querySelector('.cerrar-compartir-pop').classList.remove('mostrar');
}

//Carrousel Imagenes Del Juego
let cardWidth = 310;
let seccionCarrousel = 0;

function slideImagenesIzq(btnIzq) {
    if(seccionCarrousel != 0) {
        seccionCarrousel += 4;
    } else {
        seccionCarrousel = -8;
    }
    let slide = seccionCarrousel * cardWidth;
    let carrousel = btnIzq.nextElementSibling;
    carrousel.style.transform = `translateX(${slide}px)`;
}

function slideImagenesDer(btnDer) {
    if(seccionCarrousel >= -4) {
        seccionCarrousel -= 4;
    } else {
        seccionCarrousel = 0;
    }
    let slide = seccionCarrousel * cardWidth;
    let carrousel = btnDer.previousElementSibling;
    carrousel.style.transform = `translateX(${slide}px)`;
}