import { UnidadMedida } from "./UnidadMedida.js"

export class Duracion {
    constructor(arg0, medida) {
        if (typeof arg0 === "string") {
            if (!this.isValido(arg0)) {
                throw new TypeError("Invalido el formato")
            }
            const partes = arg0.split(" ")
            this.medida = partes.pop().toUpperCase()
            this.cantidad = +partes.pop()
        } else {
            this.cantidad = arg0
            this.medida = medida
        }
    }

    isValido(text) {
        return /\d+\s[hms]$/.test(text)
    }

    toMS() {
        if (this.medida === UnidadMedida.S) {
            return this.cantidad * 1000
        } else if (this.medida === UnidadMedida.M) {
            return 60 * this.cantidad * 1000
        } else if (this.medida === UnidadMedida.H) {
            return 60 * 60 * this.cantidad * 1000
        }
        return this.cantidad
    }
}