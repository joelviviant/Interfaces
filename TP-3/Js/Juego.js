class Juego {
    constructor(tablero, jugador1, jugador2, context) {
        this.tablero = tablero;
        this.jugadorActual = jugador1;
        this.jugadores = [jugador1, jugador2];
        this.context = context;
        this.juegoEnCurso = true;
        this.fichas = [];
        this.tiempoRestante = 30; 
        this.tiempoID = null;
        this.tiempoX = 400; 
        this.tiempoY = 15; 
        this.restartX = 750;
        this.restartY = 20; 
        this.inicializarFichas();
    }
    
    inicializarFichas() {
        for(let i = 0; i < 36; i++) {
            let fichaJ1 = new Ficha(this.context, 75, 100, 35, this.jugadores[0].ficha, this.jugadores[0]);
            this.fichas.push(fichaJ1);
        }
        for(let i = 0; i < 36; i++) {
            let fichaJ2 = new Ficha(this.context, 1005, 100, 35, this.jugadores[1].ficha, this.jugadores[1]);
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
                if(this.tablero.alineoCuatro(posicion.fila, columna, this.jugadorActual)) {
                    this.anunciarGanador(this.jugadorActual);
                    this.juegoEnCurso = false;
                    this.reiniciarJuego();
                } else if(this.tablero.tableroLleno()) {
                        this.mostrarEmpate();
                        this.juegoEnCurso = false;
                        this.reiniciarJuego();
                } else {
                    this.siguienteTurno();
                }
            } else {
                lastClickedFicha.setPosition(lastClickedFicha.xIni, lastClickedFicha.yIni);
            }
        }
    }

    mostrarEmpate(){
        this.detenerTemporizador();
        const empate = document.querySelector('.empate');
        empate.textContent = "EMPATE";
        const mostrarEmpate = document.querySelector('.mostrar-empate');
        mostrarEmpate.classList.toggle('empate');
    }

    anunciarGanador(ganador) {
        setTimeout(() => {
            console.log("El ganador es: " + ganador.nombre);
            this.detenerTemporizador();
            const elementoGanador = document.querySelector('.ganador');
            elementoGanador.textContent = "El ganador es " + ganador.nombre;
            const mostrarGanador = document.querySelector('.mostrar-ganador');
            mostrarGanador.classList.toggle('ganador');
        }, 2500);
    }

    inicializarJuego() {   
        this.drawFichas();
        this.inicializarFichas();
        this.reiniciarJuego();
        this.iniciarTemporizador(); 
    }
    
   
    reiniciarJuego() {
        this.tablero.reiniciarTablero();
        this.detenerTemporizador();
        this.iniciarTemporizador();
        this.drawFichas();
    }

    detenerTemporizador() {
        clearInterval(this.tiempoID);
        this.tiempoRestante = 30;
        this.dibujarTemporizador(); 
    }

    dibujarTemporizador() {
        this.context.clearRect(0, 0, this.tiempoX + 100, this.tiempoY + 18);
        this.context.font = "15px Arial";
        const tiempoFormateado = this.tiempoRestante < 10 ? `0${this.tiempoRestante}` : this.tiempoRestante;
        this.context.fillText(`Tiempo restante: ${tiempoFormateado} segundos`, 0, this.tiempoY);
        const primerMensajeWidth = this.context.measureText(`Tiempo restante: ${tiempoFormateado} segundos`).width;
        this.context.fillText(`Turno del Jugador: ${this.jugadorActual.nombre}`, primerMensajeWidth + 10, this.tiempoY);
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

    reiniciarJuego() {
        setTimeout(() => {
            this.fichas = [];
            this.inicializarFichas();
            this.tablero.reiniciarTablero();
            this.juegoEnCurso = true;
        }, 1000);
    }
}