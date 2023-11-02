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

//Se crea tablero y se lo dibuja
let tablero = new Tablero(6, 7, 80, "white", context, canvasWidth, canvasHeight);
tablero.draw();

//Se crean Jugadores
let jugador1 = new Jugador("Juan", "red");
let jugador2 = new Jugador("Oscar", "blue");

//Se crea el Juego
let juego = new Juego(tablero, jugador1, jugador2, context);

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    // Lógica para comenzar el juego
    juego.inicializarJuego();
    juego.dibujarTemporizador();
});

let restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    juego.detenerTemporizador();
    juego.reiniciarJuego();
    
});


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