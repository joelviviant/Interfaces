class Tablero {
    constructor(filas, columnas, tamanioCelda, color, context, canvasWidth, canvasHeight, nombreJugador1, nombreJugador2) {
        this.filas = filas;
        this.columnas = columnas;
        this.tamanioCelda = tamanioCelda;
        this.color = color;
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.condVictoria = 0;
        this.cambiarModoDeJuego();
        this.tablero = [];
        this.fichasGanadoras = []; 
        this.nombreJugador1 = nombreJugador1;
        this.nombreJugador2 = nombreJugador2;
        for (let fila = 0; fila < this.filas; fila++) {
            this.tablero[fila] = [];
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna] = 0;
            }
        }
    }
    setNombresJugadores(nombreJugador1, nombreJugador2) {
        this.nombreJugador1 = nombreJugador1;
        this.nombreJugador2 = nombreJugador2;
    }

    draw() {
        let tableroWidth = this.columnas * this.tamanioCelda;
        let tableroHeight = this.filas * this.tamanioCelda;

        let offsetX = (this.canvasWidth - tableroWidth) / 2;
        let offsetY = (this.canvasHeight - tableroHeight) / 2;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                let x = offsetX + columna * this.tamanioCelda;
                let y = offsetY + fila * this.tamanioCelda;
                if (this.tablero[fila][columna] === 0) {
                    this.context.fillStyle = "#ADFF45";
                } else {
                    this.context.fillStyle = "#302027";
                }
                this.context.beginPath();
                this.context.arc(x + this.tamanioCelda / 2, y + this.tamanioCelda / 2, this.tamanioCelda / 2, 0, 2 * Math.PI);
                this.context.fill();
                if (this.esFichaGanadora(fila, columna)) {
                    this.context.fillStyle = "#FFD700"; 
                    this.context.beginPath();
                    this.context.arc(x + this.tamanioCelda / 2, y + this.tamanioCelda / 2, this.tamanioCelda / 2, 0, 2 * Math.PI);
                    this.context.fill();
                }
                this.context.strokeRect(x, y, this.tamanioCelda, this.tamanioCelda);
            }
        }
    }

    colocarFicha(columna, jugadorActual) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.tablero[fila][columna] === 0) {
                this.tablero[fila][columna] = jugadorActual;
                if (this.alineoCuatro(fila, columna, jugadorActual)) {
                    this.marcarFichasGanadoras(fila, columna, jugadorActual);
                    let x = (columna + 0.5) * this.tamanioCelda + (this.canvasWidth - this.columnas * this.tamanioCelda) / 2;
                    let y = (fila + 0.5) * this.tamanioCelda + (this.canvasHeight - this.filas * this.tamanioCelda) / 2;
                    let posicion = { x: x, y: y, fila: fila, ganador: jugadorActual };
                    this.draw();
                    return posicion;
                } else {
                    let x = (columna + 0.5) * this.tamanioCelda + (this.canvasWidth - this.columnas * this.tamanioCelda) / 2;
                    let y = (fila + 0.5) * this.tamanioCelda + (this.canvasHeight - this.filas * this.tamanioCelda) / 2;
                    let posicion = { x: x, y: y, fila: fila };
                    this.draw();
                    return posicion;
                }
            }
        }
        return null;
    }


        alineoCuatro(fila, columna, jugadorActual) {
            let count = 0;
            for(let c = 0; c < this.columnas; c++) {
                if(this.tablero[fila][c] === jugadorActual) {
                    count++;
                    if(count >= this.condVictoria) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
    
            count = 0;
            for(let f = 0; f < this.filas; f++) {
                if(this.tablero[f][columna] === jugadorActual) {
                    count++;
                    if(count >= this.condVictoria) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
    
            count = 0;
            for (let i = -(this.condVictoria - 1); i <= this.condVictoria - 1; i++) {
                if (
                    fila + i >= 0 &&
                    fila + i < this.filas &&
                    columna + i >= 0 &&
                    columna + i < this.columnas &&
                    this.tablero[fila + i][columna + i] === jugadorActual
                ) {
                    count++;
                    if (count >= this.condVictoria) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
    
            count = 0;
            for (let i = -(this.condVictoria - 1); i <= this.condVictoria - 1; i++) {
                if (
                    fila - i >= 0 &&
                    fila - i < this.filas &&
                    columna + i >= 0 &&
                    columna + i < this.columnas &&
                    this.tablero[fila - i][columna + i] === jugadorActual
                ) {
                    count++;
                    if (count >= this.condVictoria) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
    
            return false;
        }
    

    reiniciarTablero() {
        setTimeout(() => {
            for (let fila = 0; fila < this.filas; fila++) {
                this.tablero[fila] = [];
                for (let columna = 0; columna < this.columnas; columna++) {
                    this.tablero[fila][columna] = 0;
                }
            };
        }, 1000);
    }

    tableroLleno() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                if (this.tablero[fila][columna] === 0) {
                    return false;
                }
            }
        }

        return true;
    }

    marcarFichasGanadoras(fila, columna, jugadorActual) {
        this.fichasGanadoras = [];
        
        let count = 0;
        for (let c = 0; c < this.columnas; c++) {
            if (this.tablero[fila][c] === jugadorActual) {
                count++;
                if (count >= this.condVictoria) {
                    for (let i = 0; i < this.condVictoria; i++) {
                        this.fichasGanadoras.push({ fila: fila, columna: c - i });
                    }
                    break;
                }
            } else {
                count = 0;
            }
        }
    
        
        count = 0;
        for (let f = 0; f < this.filas; f++) {
            if (this.tablero[f][columna] === jugadorActual) {
                count++;
                if (count >= this.condVictoria) {
                    for (let i = 0; i < this.condVictoria; i++) {
                        this.fichasGanadoras.push({ fila: f - i, columna: columna });
                    }
                    break;
                }
            } else {
                count = 0;
            }
        }

        count = 0;
        for (let i = -(this.condVictoria - 1); i <= this.condVictoria - 1; i++) {
            if (
                fila + i >= 0 &&
                fila + i < this.filas &&
                columna + i >= 0 &&
                columna + i < this.columnas &&
                this.tablero[fila + i][columna + i] === jugadorActual
            ) {
                count++;
                if (count >= this.condVictoria) {
                    for (let j = 0; j < this.condVictoria; j++) {
                        this.fichasGanadoras.push({ fila: fila + i - j, columna: columna + i - j });
                    }
                    break;
                }
            } else {
                count = 0;
            }
        }
    
        count = 0;
        for (let i = -(this.condVictoria - 1); i <= this.condVictoria - 1; i++) {
            if (
                fila - i >= 0 &&
                fila - i < this.filas &&
                columna + i >= 0 &&
                columna + i < this.columnas &&
                this.tablero[fila - i][columna + i] === jugadorActual
            ) {
                count++;
                if (count >= this.condVictoria) {
                    for (let j = 0; j < this.condVictoria; j++) {
                        this.fichasGanadoras.push({ fila: fila - i + j, columna: columna + i - j });
                    }
                    break;
                }
            } else {
                count = 0;
            }
        }
    }
    
    esFichaGanadora(fila, columna) {
        for (const ficha of this.fichasGanadoras) {
            if (ficha.fila === fila && ficha.columna === columna) {
                return true;
            }
        }
        return false;
    }

    cambiarModoDeJuego() {
        if (this.filas == 6 && this.columnas == 7) {
            this.condVictoria = 4;
        } else if (this.filas == 7 && this.columnas == 8) {
            this.condVictoria = 5;
        } else if (this.filas == 8 && this.columnas == 9) {
            this.condVictoria = 6;
        }
    }
}