class Jugador {
    constructor(nombre, color, totalFichas) {
        this.nombre = nombre;
        this.color = color;
        this.totalFichas = totalFichas;
        this.fichasDisponibles = totalFichas;
    }

    // Método para reducir la cantidad de fichas disponibles
    tomarFicha() {
        if (this.fichasDisponibles > 0) {
            this.fichasDisponibles--;
            return true;
        } else {
            return false; // No quedan fichas disponibles
        }
    }

    // Método para devolver una ficha (por ejemplo, cuando el jugador retira una ficha del tablero)
    devolverFicha() {
        if (this.fichasDisponibles < this.totalFichas) {
            this.fichasDisponibles++;
        }
    }
}