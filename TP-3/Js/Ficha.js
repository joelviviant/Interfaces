class Ficha {
    constructor(context, x, y, radius, imagenSrc, jugador) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.xIni = x;
        this.yIni = y;
        this.radius = radius;
        this.imagen = new Image();
        this.imagen.src = imagenSrc;
        this.jugador = jugador;
        this.colocada = false;
    }

    draw() {
        this.context.drawImage(this.imagen, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
    }

    isPointInside(x, y) {
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setPosition(x, y) {
        this. x = x;
        this.y = y;
    }
}
