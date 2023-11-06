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
        this.inicializarJuego();
    }
    
    inicializarFichas() {
        for(let i = 0; i < 72; i++) {
        // Carga las imágenes de las fichas elegidas por los jugadores
        let fichaJ1 = new Ficha(
            this.context,
            50,
            50,
            60,
            60,
            fichaj1, 
            this.jugadores[0]
        )
        this.fichas.push(fichaJ1);
        };
        for(let i = 0; i < 72; i++) {
        let fichaJ2 = new Ficha(
            this.context,
            1000,
            50,
            60,
            60,
            fichaj2,
            this.jugadores[1]
        )
        this.fichas.push(fichaJ2);
        };
    
        
        this.drawFichas();
       
    }
   
    drawFichas() {
        clearCanvas();
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, canvasWidth, canvasHeight);
    
        this.tablero.draw();
    
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i];
            if (this.jugadorActual === ficha.jugador) {
                this.context.save();
                this.context.strokeStyle = "yellow";
                this.context.lineWidth = 3;
                this.context.beginPath();
                this.context.arc(
                    ficha.x + ficha.width / 2, // Centro X del círculo
                    ficha.y + ficha.height / 2, 
                    ficha.width / 2 + 2, 
                    0, 
                    Math.PI * 2 
                );
                this.context.stroke();
                this.context.restore();
            }
            ficha.draw();
            this.context.strokeStyle = "black"; // Restablece el color del borde a negro
        }
    }
 
    iniciarTemporizador() {
        this.tiempoRestante = 30;
        this.drawFichas();
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
                let x = (columna + 0.5) * this.tablero.tamanioCelda + (this.tablero.canvasWidth - this.tablero.columnas * this.tablero.tamanioCelda) / 2 - lastClickedFicha.width / 2;
                let y = (posicion.fila + 0.5) * this.tablero.tamanioCelda + (this.tablero.canvasHeight - this.tablero.filas * this.tablero.tamanioCelda) / 2 - lastClickedFicha.height / 2;
                lastClickedFicha.setPosition(x, y);
                lastClickedFicha.colocada = true;     
                if(this.tablero.alineoCuatro(posicion.fila, columna, this.jugadorActual)) {
                    this.anunciarGanador(this.jugadorActual);
                    this.juegoEnCurso = false;
                    this.reiniciarJuego();
                } else if(!this.tablero.tableroLleno()) {
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
        this.detenerTemporizador();
        const elementoGanador = document.querySelector('.ganador');
        elementoGanador.textContent = "El ganador es " + ganador.nombre;
        const mostrarGanador = document.querySelector('.mostrar-ganador');
        mostrarGanador.classList.toggle('ganador');
    }

    inicializarJuego() {
        this.inicializarFichas();
        this.drawFichas();
        this.reiniciarJuego();
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
        this.context.fillText(`Turno del Jugador: ${this.jugadorActual.nombre}`, this.tiempoX, this.tiempoY + 20);
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