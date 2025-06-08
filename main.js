// Autor: Víctor Martínez
import { Duracion } from "./classes/Duracion.js"
import { SoundLocal } from "./classes/SoundLocal.js"
import { Temporizador } from "./classes/Temporizador.js"


const $ = selector => {
    return document.querySelector(selector)
}


const crearBoton = (name, callback, ctx) => {
    const boton = $(name)

    boton.addEventListener("click", () => callback.call(ctx))

    boton.activar = function () {
        this.style.display = "flex"
    }

    boton.desactivar = function () {
        this.style.display = "none"
    }

    return boton
}


const pantalla = $("#pantalla")
const canvas = $("canvas")
canvas.width = 300
canvas.height = 300
const ctx = canvas.getContext('2d')
const soundLocal = new SoundLocal("./audio/alarm.mp3")


const tempo = new Temporizador(new Duracion("2 s"), async ({ resto, total, running }) => {
    const angle = 2 * (resto / total) * Math.PI
    if (!running) {
        reset()
        soundLocal.play()
    }
    drawBorder(150, 150, 100, angle)
    pantalla.textContent = formatearTiempo(resto)
})


function drawBorder(x, y, radio, angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(x, y, radio, 0, 2 * Math.PI)
    ctx.strokeStyle = "tomato"
    ctx.lineWidth = 14
    ctx.stroke()
    ctx.closePath()
    ctx.save()

    ctx.beginPath()
    ctx.arc(x, y, radio, 0, angle)
    ctx.lineWidth = 10
    ctx.strokeStyle = "#000"
    ctx.stroke()
    ctx.closePath()
}


const rellenarDecena = (numero, defaultValue = "0") => {
    if (numero < 10) {
        return defaultValue + numero
    }
    return numero
}


const formatearTiempo = milisegundos => {
    let horas = parseInt(milisegundos / 1000 / 60 / 60)
    milisegundos -= horas * 60 * 60 * 1000
    let minutos = parseInt(milisegundos / 1000 / 60)
    if (minutos > 59) {
        horas++
        minutos = 0
    }
    milisegundos -= minutos * 60 * 1000
    let segundos = milisegundos / 1000
    if (segundos > 59) {
        minutos++
        segundos = 0
    }
    return `${rellenarDecena(horas)}:${rellenarDecena(minutos)}:${rellenarDecena(segundos.toFixed(0))}`
}


const iniciar = () => {
    if (soundLocal.isPlaying()) {
        soundLocal.stop()
    }
    tempo.start()
    btnIniciar.desactivar()
    btnPausar.activar()
}


const pausar = () => {
    tempo.pause()
    btnIniciar.activar()
    btnPausar.desactivar()
}


const reset = () => {
    if (soundLocal.isPlaying()) {
        soundLocal.stop()
    }
    tempo.reset()
    pantalla.textContent = "00:00:00"
    drawBorder(150, 150, 100, 0)
    btnPausar.desactivar()
    btnIniciar.activar()
}


const btnIniciar = crearBoton("#btnIniciar", iniciar, this)
const btnPausar = crearBoton("#btnPausar", pausar, this)
crearBoton("#btnReiniciar", reset, this)


reset()