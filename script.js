// Autor: Víctor Martínez
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


const $pantalla = $("#pantalla")
const canvas = $("canvas")
canvas.width = 300
canvas.height = 300
const ctx = canvas.getContext('2d')

const tiempo = 40000
let interval = 0
let tiempoInicio = null
let tiempoReciente = 0



function drawBorder(x, y, radio, angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(x, y, radio, 0, 2*Math.PI)
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

const rellenarDecena = (numero, defaultValue="0") => {
    if (numero < 10) {
        return defaultValue+numero
    }
    return numero
}

const formatearTiempo = milisegundos => {
    let horas = parseInt(milisegundos / 1000 / 60 / 60)
    milisegundos -= horas * 60 * 60 * 1000
    let minutos = parseInt(milisegundos / 1000 / 60)
    if (minutos > 59) {
        horas ++
        minutos = 0
    }
    milisegundos -= minutos * 60 * 1000
    let segundos = (milisegundos / 1000)
    if (segundos > 59) {
        minutos ++
        segundos = 0
    }
    return `${rellenarDecena(horas)}:${rellenarDecena(minutos)}:${rellenarDecena(segundos.toFixed(0))}`
}

const iniciar = () => {
    const ahora = new Date()
    tiempoInicio = new Date(ahora.getTime() - tiempoReciente)
    clearInterval(interval)
    interval = setInterval(actualizarTempo, 100)

    btnIniciar.desactivar()
    btnPausar.activar()
}

const pausar = () => {
    tiempoReciente = new Date() - tiempoInicio.getTime()
    clearInterval(interval)
    btnIniciar.activar()
    btnPausar.desactivar()
}

const actualizarTempo = () => {
    const ahora = new Date()
    const diferencia = ahora.getTime() - tiempoInicio.getTime()
    const resto = tiempo - diferencia
    if (resto < 0) {
        reset()
        drawBorder(150, 150, 100, 0)
        return
    }
    const angle = 2 * (resto / tiempo) * Math.PI
    drawBorder(150, 150, 100, angle)
    $pantalla.textContent = formatearTiempo(resto)
}

const reset = () => {
    clearInterval(interval)
    tiempoReciente = 0
    $pantalla.textContent = "00:00:00"
    drawBorder(150, 150, 100, 0)
    btnPausar.desactivar()
    btnIniciar.activar()
}

const btnIniciar = crearBoton("#btnIniciar", iniciar, this)
const btnPausar = crearBoton("#btnPausar", pausar, this)
const btnReset = crearBoton("#btnReiniciar", reset, this)


reset()