class Juego {
    constructor(tablero, jugador1, jugador2, context) {
        this.tablero = tablero;
        this.jugadorActual = jugador1;
        this.jugadores = [jugador1, jugador2];
        this.context = context;
        this.juegoEnCurso = true;
    }
    
    manejarTurno(columna) {
        if(this.juegoEnCurso) {
            let posicion = this.tablero.colocarFicha(columna, this.jugadorActual);
            if(posicion) {
                let ficha = new Ficha(this.context, posicion.x, posicion.y, 30, this.jugadorActual.color);
                ficha.draw();
                
                // Verificar si hay un ganador
                if(this.verificarGanador(posicion.fila, columna, this.jugadorActual)) {
                    this.anunciarGanador(this.jugadorActual);
                    this.juegoEnCurso = false;
                    this.reiniciarJuego();
                } else {
                    this.siguienteTurno();
                }
            }
        }
    }
    
    verificarGanador(fila, columna, jugadorActual) {
        if (
            this.tablero.alineoCuatro(fila, columna, jugadorActual) ||
            this.tablero.alineoCuatro(fila, columna - 1, jugadorActual) ||
            this.tablero.alineoCuatro(fila, columna - 2, jugadorActual) ||
            this.tablero.alineoCuatro(fila, columna + 1, jugadorActual)
        ) {
            return true;
        }
    
        return false;
    }

    siguienteTurno() {
        if(this.jugadorActual == this.jugadores[0]) {
            this.jugadorActual = this.jugadores[1];
        } else if (this.jugadorActual == this.jugadores[1]) {
            this.jugadorActual = this.jugadores[0];
        }
    }

    anunciarGanador(ganador) {
        console.log("El ganador es: " + ganador.nombre);
    }

    reiniciarJuego() {
        this.tablero.reiniciarTablero();
        setTimeout(() => {
            this.juegoEnCurso = true;
        }, 3000);
    }
}