let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

function clearCanvas() {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

context.fillStyle = "grey";
context.fillRect(0, 0, canvasWidth, canvasHeight);

//Se crea tablero y se lo dibuja
let tablero = new Tablero(7, 8, 80, "white", context, canvasWidth, canvasHeight);
tablero.draw();

//Se crean Jugadores
let jugador1 = new Jugador("Juan", "red");
let jugador2 = new Jugador("Oscar", "blue");

//Se crea el Juego
let juego = new Juego(tablero, jugador1, jugador2, context);


//Evento en el canvas, para cuando se clickea una columna coloque la ficha
canvas.addEventListener('click', function(e) {
    let rect = canvas.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let columna = Math.floor((offsetX - (canvasWidth - tablero.columnas * tablero.tamanioCelda) / 2) / tablero.tamanioCelda);

    juego.manejarTurno(columna);
})