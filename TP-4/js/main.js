let btnMenu = document.querySelector('.btn-menu');
btnMenu.addEventListener('click', () => {
    let aux1 = btnMenu.firstElementChild;
    let aux2 = aux1.nextElementSibling;
    let aux3 = btnMenu.lastElementChild;

    aux1.classList.toggle('abrir-menu-top');
    aux2.classList.toggle('abrir-menu-medium');
    aux3.classList.toggle('abrir-menu-bottom');
});



//HEADER
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let logo = document.querySelector('.logo');
    let logoHeader = document.querySelector('.logo-header');

    let header = document.querySelector('.header');

    if(posScroll > 130) {
        header.classList.add('achicar');
        logoHeader.style.opacity = 1;
        logo.style.opacity = 0;
    } else {
        header.classList.remove('achicar');
        logoHeader.style.opacity = 0;
        logo.style.opacity = 1;
    }

    logo.style.scale = 1 - posScroll / 300;
}) 

//PARALAX PORTADA
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let pj1 = document.querySelector('.personaje-1');
    let pj2 = document.querySelector('.personaje-2');
    let pj3 = document.querySelector('.personaje-3');
    let edi1 = document.querySelector('.edificios-1');
    let edi2 = document.querySelector('.edificios-2');
    let edi3 = document.querySelector('.edificios-3');
    let tel1 = document.querySelector('.telaraña-left');
    let tel2 = document.querySelector('.telaraña-right');

    //Cuando se scrollea los superherores y las telarañas se van para arriba
    //mientras que los edificios de los laterales se van para afuera
    //y el edificio del medio se va hacia abajo.

    pj1.style.transform = "translateY("+ -posScroll * 0.3 +"px)";
    pj2.style.transform = "translateY("+ -posScroll * 0.3 +"px)";
    pj3.style.transform = "translateY("+ -posScroll * 0.3 +"px)";

    tel1.style.transform = "translateY("+ -posScroll * 0.3 +"px)";
    tel2.style.transform = "translateY("+ -posScroll * 0.3 +"px)";

    edi1.style.marginLeft = ""+ -posScroll*0.1 +"px";
    edi2.style.marginTop = ""+ posScroll*0.1 +"px";
    edi3.style.marginRight = ""+ -posScroll*0.1 +"px";
})



// Selecciona las imágenes de los personajes
const pjLeft = document.querySelector('.s7-pj-left');
const pjMid = document.querySelector('.s7-pj-mid');
const pjRight = document.querySelector('.s7-pj-right');

// Calcula el desplazamiento máximo permitido para los personajes
const maxOffset = 30; // Puedes ajustar este valor según tus preferencias

// Agrega un evento de escucha al movimiento del mouse para cada imagen de personaje
[pjLeft, pjMid, pjRight].forEach(function(img) {
    img.addEventListener('mousemove', moveImage);
});

// Función para mover la imagen activa
function moveImage(event) {
    // Calcula la posición del ratón dentro de la imagen
    const imgRect = this.getBoundingClientRect();
    const mouseX = event.clientX - imgRect.left;
    const mouseY = event.clientY - imgRect.top;

    // Calcula el porcentaje de desplazamiento basado en la posición del ratón
    const offsetX = (mouseX / imgRect.width - 0.5) * 2;
    const offsetY = (mouseY / imgRect.height - 0.5) * 2;

    // Aplica el desplazamiento solo a la imagen activa
    this.style.transform = `translate(${maxOffset * offsetX}px, ${maxOffset * offsetY}px)`;
}
//Entrada de elementos a pantalla
window.onload = function() {
    if (!localStorage.getItem("redirected")) {
        // Redirigir a home.html
        window.location.href = "home.html";
        // Marcar como redirigido
        localStorage.setItem("redirected", "true");
    } else {
        // Limpiar el indicador de redirección
        localStorage.removeItem("redirected");
    }
    let pj1 = document.querySelector('.personaje-1');
    let pj2 = document.querySelector('.personaje-2');
    let pj3 = document.querySelector('.personaje-3');
    let edi1 = document.querySelector('.edificios-1');
    let edi2 = document.querySelector('.edificios-2');
    let edi3 = document.querySelector('.edificios-3');
    let logo = document.querySelector('.logo');
    let tel1 = document.querySelector('.telaraña-left');
    let tel2 = document.querySelector('.telaraña-right');
    
    logo.classList.add('logo-aparecer');
    edi1.classList.add('edificios-1-aparecer');
    edi2.classList.add('edificios-2-aparecer');
    edi3.classList.add('edificios-3-aparecer');
    pj1.classList.add('personaje-1-aparecer');
    pj2.classList.add('personaje-2-aparecer');
    pj3.classList.add('personaje-3-aparecer');
    tel1.classList.add('telaraña-left-aparecer');
    tel2.classList.add('telaraña-right-aparecer');
}

//SECCION 1
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let duende = document.getElementById('duende');
    duende.style.transform = "translateY("+ posScroll*0.03 +"px)";
})

//SECCION 2
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    //Cuando aparece la seccion aparecen las 3 cards desde abajo a diferentes
    //velocidades, las velocidades las hice con distinto tiempo de transition
    //en cada card en el css.
    if(posScroll > 1300) {
        let pj1 = document.querySelector('.personajes-descripcion-1');
        let pj2 = document.querySelector('.personajes-descripcion-2');
        let pj3 = document.querySelector('.personajes-descripcion-3');
        pj1.classList.add('fade-in');
        pj2.classList.add('fade-in');
        pj3.classList.add('fade-in');
    }
})

//SECCION 3
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let s3Cards = document.querySelector('.s3-cards');

    s3Cards.style.transform = "translateY("+posScroll*0.02+"px)";
})

//SECCION 4
document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let imagen = document.getElementById('s4-img');


    //Agarro urls de las imagenes
    let img1 = "images/image 21.png";
    let img2 = "images/image 9.png";
    let img3 = "images/image 10.png";
    let img4 = "images/image 6.png";

    //Agarro textos
    let txt1 = document.getElementById('s4-txt1');
    let txt2 = document.getElementById('s4-txt2');
    let txt3 = document.getElementById('s4-txt3');
    let txt4 = document.getElementById('s4-txt4');


    //Segun la posicion del scroll voy cambiando la url de la imagen, que queda
    //sticky a la izquierda de la pantalla, y ademas le voy poniendo o sacando
    //opacidad a los textos que se corresponden con la imagen.
    if(posScroll > 3300 && posScroll < 4250) {
        txt2.style.opacity = 0;
        txt3.style.opacity = 0;
        txt4.style.opacity = 0;

        imagen.src = img1;
        imagen.style.opacity = 1;
        txt1.style.opacity = 1;
    } else if(posScroll > 4250 && posScroll < 4690) {
        txt1.style.opacity = 0;
        txt3.style.opacity = 0;
        txt4.style.opacity = 0;

        imagen.src = img2;
        txt2.style.opacity = 1;
    } else if(posScroll > 4690 && posScroll < 5140) {
        txt2.style.opacity = 0;
        txt4.style.opacity = 0;
        txt1.style.opacity = 0;

        imagen.src = img3;
        txt3.style.opacity = 1;
    } else if(posScroll > 5140) {
        txt3.style.opacity = 0;
        txt1.style.opacity = 0;
        txt2.style.opacity = 0;

        imagen.src = img4;
        txt4.style.opacity = 1;
    }

    //Aca verifico que cuando este dentro del rango de la seccion la imagen sea sticky
    //si se pasa, que sea absoluta asi no sigue bajando al resto de la pagina.
    if(posScroll > 3300 && posScroll < 5400) {
        imagen.style.position = "sticky";
        imagen.style.top = "150px";
    } else if(posScroll > 5400) {
        imagen.style.position = "absolute";
        imagen.style.top = "1342px";
        imagen.style.opacity = 1;
    }
})

var heroeMid = document.getElementById("heroe-mid");
var heroeLeft = document.getElementById("heroe-left");
var heroeRight = document.getElementById("heroe-right");
var fondoMid = document.getElementById("heroe-mid-fondo");
var fondoRight = document.getElementById("heroe-right-fondo");
var fondoLeft = document.getElementById("heroe-left-fondo");

heroeMid.addEventListener("click", CambiarFondoMid);
heroeRight.addEventListener("click", CambiarFondoRight);
heroeLeft.addEventListener("click", CambiarFondoLeft);

function CambiarFondoMid(){
        fondoLeft.classList.add("s5-pj-fondo-left-ocultar");
        fondoRight.classList.add("s5-pj-fondo-right")
        fondoMid.classList.remove("s5-pj-fondo-mid");
        fondoMid.classList.add("s5-pj-fondo-mid-show");        
}

function CambiarFondoRight(){
    fondoLeft.classList.add("s5-pj-fondo-left-ocultar");
    fondoMid.classList.add("s5-pj-fondo-mid")
    fondoRight.classList.remove("s5-pj-fondo-right");
    fondoRight.classList.add("s5-pj-fondo-right-show");       
}

function CambiarFondoLeft(){
    fondoMid.classList.add("s5-pj-fondo-mid")
    fondoRight.classList.add("s5-pj-fondo-right")
    fondoLeft.classList.remove("s5-pj-fondo-left-ocultar");
    fondoLeft.classList.add("s5-pj-fondo-left")
}

