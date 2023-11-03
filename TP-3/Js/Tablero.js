class Tablero {
    constructor(filas, columnas, tamanioCelda, color, context, canvasWidth, canvasHeight) {
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
        for(let fila = 0; fila < this.filas; fila++) {
            this.tablero[fila] = [];
            for(let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna] = 0;
            }
        }
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
    
                // Dibuja un círculo relleno de verde en cada casillero
                this.context.fillStyle = "#ADFF45";
                this.context.beginPath();
                this.context.arc(x + this.tamanioCelda / 2, y + this.tamanioCelda / 2, this.tamanioCelda / 2, 0, 2 * Math.PI);
                this.context.fill();
    
                // Dibuja las líneas del tablero
                this.context.strokeRect(x, y, this.tamanioCelda, this.tamanioCelda);
            }
        }
    }

    colocarFicha(columna, jugadorActual) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.tablero[fila][columna] === 0) {
                this.tablero[fila][columna] = jugadorActual;
                let x = (columna + 0.5) * this.tamanioCelda + (this.canvasWidth - this.columnas * this.tamanioCelda) / 2;
                let y = (fila + 0.5) * this.tamanioCelda + (this.canvasHeight - this.filas * this.tamanioCelda) / 2;
                let posicion = {x: x, y: y, fila: fila};
                this.draw();
                return posicion;
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
            for(let fila = 0; fila < this.filas; fila++) {
                this.tablero[fila] = [];
                for(let columna = 0; columna < this.columnas; columna++) {
                    this.tablero[fila][columna] = 0;
                }
            };
        }, 1000);
    }

    tableroLleno() {
        for(let fila = 0; fila < this.filas; fila++) {
            for(let columna = 0; columna < this.columnas; columna++) {
                if(this.tablero[fila][columna] === 0) {
                    return false;
                }
            }
        }

        return true;
    }

    cambiarModoDeJuego() {
        if(this.filas == 6 && this.columnas == 7) {
            this.condVictoria = 4;
        } else if(this.filas == 7 && this.columnas == 8) {
            this.condVictoria = 5;
        } else if(this.filas == 8 && this.columnas == 9) {
            this.condVictoria = 6;
        }
    }
}