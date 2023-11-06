let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let lastClickedFicha = null;
let isMouseDown = false;

//Limpia el Canvas
function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

context.fillStyle = "grey";
context.fillRect(0, 0, canvasWidth, canvasHeight);

//Configuracion del juego
let juego;
let fichaj1;
let fichaj2;
let fichasJ1 = document.querySelectorAll('.fichas-j1 .ficha');
let fichasJ2 = document.querySelectorAll('.fichas-j2 .ficha');

let botones = document.querySelectorAll('.btn-modo-juego');
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        document.querySelector('.juego-config').classList.add('ocultar');
        let modoJuego = boton.value;
        jugar(modoJuego);
    })
});

function selectDefault(){
    let pj1 = document.getElementById('pj1');
    let pj2 = document.getElementById('pj2');
    seleccionarFichaJ1(pj1);
    seleccionarFichaJ2(pj2);
}
selectDefault();

function seleccionarFichaJ1(ficha) {
    fichaj1 = ficha.getAttribute("data-value"); // Obtén la ruta de la imagen del atributo "data-value"
    quitarSeleccionFichasJ1(ficha);
    ficha.classList.add('seleccionada');
    console.log(fichaj1)
}  

function quitarSeleccionFichasJ1(fichaSeleccionada) {
    fichasJ1.forEach((ficha) => {
        if(ficha !== fichaSeleccionada && ficha.classList.contains('seleccionada')) {
            ficha.classList.remove('seleccionada');
        }
    });
}

function seleccionarFichaJ2(ficha) {
    fichaj2 = ficha.getAttribute("data-value"); // Obtén la ruta de la imagen del atributo "data-value"
    quitarSeleccionFichasJ2(ficha);
    ficha.classList.add('seleccionada');
    console.log(fichaj2)
}

function quitarSeleccionFichasJ2(fichaSeleccionada) {
    fichasJ2.forEach((ficha) => {
        if(ficha !== fichaSeleccionada && ficha.classList.contains('seleccionada')) {
            ficha.classList.remove('seleccionada');
        }
    });
}

let restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    juego.detenerTemporizador();
    juego.reiniciarJuego();
    document.querySelector('.juego-config').classList.toggle('ocultar'); 
    document.querySelector('.mostrar-empate').classList.remove('empate');    
    document.querySelector('.mostrar-ganador').classList.remove('ganador');    
});

function jugar(modoJuego) {
    let jugador1;
    let jugador2;
    if(fichaj1 != null && fichaj2 != null) {
        jugador1 = new Jugador("Jugador1", fichaj1);
        jugador2 = new Jugador("Jugador2", fichaj2);
    } else {
        jugador1 = new Jugador("Jugador1", "../Images/caruso.jpg");
        jugador2 = new Jugador("Jugador2", "blue");
    }

    if(modoJuego == 4) {
        tablero = new Tablero(6, 7, 80, "white", context, canvasWidth, canvasHeight);
        juego = new Juego(tablero, jugador1, jugador2, context);
    } else if(modoJuego == 5) {
        tablero = new Tablero(7, 8, 80, "white", context, canvasWidth, canvasHeight);
        juego = new Juego(tablero, jugador1, jugador2, context);
    } else if(modoJuego == 6) {
        tablero = new Tablero(8, 9, 80, "white", context, canvasWidth, canvasHeight);
        juego = new Juego(tablero, jugador1, jugador2, context);
    }
}


//Eventos de Mouse
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function onMouseDown(e) {
    isMouseDown = true;
    let jugadorActual = juego.jugadorActual;

    if(lastClickedFicha != null) {
        lastClickedFicha = null;
    }

    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    let clickedFicha = findClickedFicha(mouseX, mouseY);

    if(clickedFicha != null && jugadorActual === clickedFicha.jugador && clickedFicha.colocada == false) {
        lastClickedFicha = clickedFicha;
    }

    juego.drawFichas();
}

function onMouseMove(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    if(isMouseDown && lastClickedFicha != null) {
        lastClickedFicha.setPosition(mouseX, mouseY);
        juego.drawFichas();
    }
}

function onMouseUp(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    if(lastClickedFicha != null) {
        lastClickedFicha.setPosition(mouseX, mouseY);
        let offsetX = e.clientX - rect.left;

        let columna = Math.floor((offsetX - (canvasWidth - tablero.columnas * tablero.tamanioCelda) / 2) / tablero.tamanioCelda);

        juego.colocarFicha(columna, lastClickedFicha);
    }

    isMouseDown = false;
    juego.drawFichas();
}

function findClickedFicha(x, y) {
    for (let i = 0; i < juego.fichas.length; i++) {
        const element = juego.fichas[i];
        if(element.isPointInside(x, y)) {
            return element;
        }
    }
}