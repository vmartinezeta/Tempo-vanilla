export class Temporizador {
    constructor(duracion, callback) {
        this.duracion = duracion
        this.starttime = null
        this.transcurrido = 0
        this.timer = 0
        this.callback = callback
        this.running = false
    }

    start() {
        if (!this.starttime) {
            this.starttime = Date.now()
            this.running = true
        }
        
        const time = Date.now() - this.starttime + this.transcurrido
        if (time >= this.duracion.toMS()) {
            this.running = false
            this.callback({
                time:this.duracion.toMS(),
                resto: 0,
                total: this.duracion.toMS(),
                running: this.running
            })
            return
        }

        this.timer = setTimeout(()=>{
            this.callback({
                time,
                resto: this.duracion.toMS() - time,
                total: this.duracion.toMS(),
                running:this.running
            })
            this.start()
        }, 100)
    }

    pause() {
        this.transcurrido += Date.now() - this.starttime
        this.starttime = null
        this.running = false
        clearTimeout(this.timer)
    }

    reset() {
        this.starttime = null
        this.transcurrido = 0
        this.timer = 0
        this.running = false
    }

}