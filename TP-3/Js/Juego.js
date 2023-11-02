class Juego {
    constructor(tablero, jugador1, jugador2, context) {
        this.tablero = tablero;
        this.jugadorActual = jugador1;
        this.jugadores = [jugador1, jugador2];
        this.context = context;
        this.juegoEnCurso = true;
        this.fichas = [];
        this.fichasEnJuego = [];
        this.tiempoRestante = 30; 
        this.tiempoID = null; 
        this.tiempoX = 400; 
        this.tiempoY = 50; 
        this.restartX = 750;
        this.restartY = 20; 
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
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);

        this.tablero.draw();
        for(let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].draw();
        }
    }
 
    iniciarTemporizador() {
        this.tiempoRestante = 30;
        this.dibujarTemporizador();
        this.tiempoID = setInterval(() => {
            this.tiempoRestante--;
            this.dibujarTemporizador();
    
            if (this.tiempoRestante <= 0) {
                clearInterval(this.tiempoID);
                this.tiempoRestante = 0; 
                this.dibujarTemporizador();
                this.siguienteTurno();
            }
        }, 1000);
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

    

    anunciarGanador(ganador) {
        console.log("El ganador es: " + ganador.nombre);
        this.detenerTemporizador();
       
    }

    inicializarJuego() {   
        this.iniciarTemporizador(); 
    }
    
   
    reiniciarJuego() {
        this.limpiarFichasEnJuego();
        this.tablero.reiniciarTablero();
        this.resetearBordesFichas();
        this.fichasGanadoras = [];
        this.detenerTemporizador();
        this.iniciarTemporizador();
        this.drawFichas();
    }

    limpiarFichasEnJuego() {
        for (let i = 0; i < this.fichasEnJuego.length; i++) {
            let ficha = this.fichasEnJuego[i];
            this.context.clearRect(ficha.x - ficha.radius, ficha.y - ficha.radius, ficha.radius * 2, ficha.radius * 2);
        }
        this.fichasEnJuego = []; 
        this.fichas = this.fichas.filter(ficha => !ficha.colocada);
    }
  

    detenerTemporizador() {
        clearInterval(this.tiempoID);
        this.tiempoRestante = 30;
        this.dibujarTemporizador(); 
    }

    dibujarTemporizador() {
        this.context.clearRect(this.tiempoX - 10, this.tiempoY - 30, 300, 60);
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        const tiempoFormateado = this.tiempoRestante < 10 ? `0${this.tiempoRestante}` : this.tiempoRestante;
        this.context.fillText(`Tiempo restante: ${tiempoFormateado} segundos`, this.tiempoX, this.tiempoY);
        this.context.fillText(`Turno del Jugador: ${this.jugadorActual.nombre}`, this.tiempoX, this.tiempoY + 30);
    }
    siguienteTurno() {
        if (this.jugadorActual == this.jugadores[0]) {
            this.jugadorActual = this.jugadores[1];
            this.detenerTemporizador(); 
            this.iniciarTemporizador(); 
        } else if (this.jugadorActual == this.jugadores[1]) {
            this.jugadorActual = this.jugadores[0];
            this.detenerTemporizador(); 
            this.iniciarTemporizador(); 
        }
        
    }

    
}