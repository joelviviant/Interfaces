class Ficha {
    constructor(context, x, y, width, height, imagen, jugador) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imagen = new Image();
        this.imagen.src = imagen;
        this.jugador = jugador;
        this.colocada = false;
    }

    draw() {
        this.context.drawImage(this.imagen, this.x, this.y, this.width, this.height);
    }

    isPointInside(x, y) {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
