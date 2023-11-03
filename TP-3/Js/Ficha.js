class Ficha {
    constructor(context, x, y, radius, color, jugador) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.xIni = x;
        this.yIni = y;
        this.radius = radius;
        this.color = color;
        this.jugador = jugador;
        this.colocada = false;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
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
