class Tablero {
    constructor(filas, columnas, tamanioCelda, color, context, canvasWidth, canvasHeight) {
        this.filas = filas;
        this.columnas = columnas;
        this.tamanioCelda = tamanioCelda;
        this.color = color;
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tablero = [];

        //Inicializa la Matriz del tablero
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

        this.context.fillStyle = this.color;
        this.context.fillRect(offsetX, offsetY, tableroWidth, tableroHeight);

        for(let fila = 0; fila < this.filas; fila++) {
            for(let columna = 0; columna < this.columnas; columna++) {
                let x = offsetX + columna * this.tamanioCelda;
                let y = offsetY + fila * this.tamanioCelda;
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
                if(count >= 4) {
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
                if(count >= 4) {
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
            this.draw();
            for(let fila = 0; fila < this.filas; fila++) {
                this.tablero[fila] = [];
                for(let columna = 0; columna < this.columnas; columna++) {
                    this.tablero[fila][columna] = 0;
                }
            };
        }, 3000);
    }
}