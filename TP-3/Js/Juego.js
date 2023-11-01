class Juego {
    constructor(tablero, jugador1, jugador2, context) {
        this.tablero = tablero;
        this.jugadorActual = jugador1;
        this.jugadores = [jugador1, jugador2];
        this.context = context;
        this.juegoEnCurso = true;
        this.fichas = [];
        this.fichasEnJuego = [];
        
        this.inicializarFichas();
    }

    inicializarFichas() {
        for(let i = 0; i < 21; i++) {
            let fichaJ1 = new Ficha(this.context, 50, 50, 30, this.jugadores[0].color, this.jugadores[0]);
            this.fichas.push(fichaJ1);
        }
        for(let i = 0; i < 21; i++) {
            let fichaJ2 = new Ficha(this.context, 1000, 50, 30, this.jugadores[1].color, this.jugadores[1]);
            this.fichas.push(fichaJ2);
        }
        this.drawFichas();
    }

    drawFichas() {
        clearCanvas();
        this.context.fillStyle = "grey";
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);

        this.tablero.draw();
        for(let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].draw();
        }
    }
    
    colocarFicha(columna, lastClickedFicha) {
        if (this.juegoEnCurso) {
            let posicion = this.tablero.colocarFicha(columna, this.jugadorActual);
            if (posicion) {
                lastClickedFicha.setPosition(posicion.x, posicion.y);
                lastClickedFicha.colocada = true;
                this.fichasEnJuego.push(lastClickedFicha);                
                if(this.tablero.alineoCuatro(posicion.fila, columna, this.jugadorActual)) {
                    this.anunciarGanador(this.jugadorActual);
                    this.juegoEnCurso = false;
                    this.reiniciarJuego();
                } else {
                    this.siguienteTurno();
                }
            }
        }
    }

    siguienteTurno() {
        if(this.jugadorActual == this.jugadores[0]) {
            this.jugadorActual = this.jugadores[1];
        } else if (this.jugadorActual == this.jugadores[1]) {
            this.jugadorActual = this.jugadores[0];
        }
    }

    anunciarGanador(ganador, fichasGanadoras) {
        console.log("El ganador es: " + ganador.nombre);
       
    }

   
    reiniciarJuego() {
        this.limpiarFichasEnJuego();  // Limpia solo las fichas en juego
        this.tablero.reiniciarTablero();  // Limpia el tablero
        this.drawFichas();  // Vuelve a dibujar las fichas restantes

        setTimeout(() => {
            this.juegoEnCurso = true;
        }, 3000);
    }

    limpiarFichasEnJuego() {
        for (let i = 0; i < this.fichasEnJuego.length; i++) {
            let ficha = this.fichasEnJuego[i];
            // Borra la ficha del canvas
            this.context.clearRect(ficha.x - ficha.radius, ficha.y - ficha.radius, ficha.radius * 2, ficha.radius * 2);
        }
        this.fichasEnJuego = [];  // Limpia el registro de fichas en juego

        // Además, elimina las fichas del array 'fichas'
        this.fichas = this.fichas.filter(ficha => !ficha.colocada);
    }
}