export class SoundLocal {
    constructor(path) {
        this.path = path
        this.context = null
        this.source = null
    }

    createContext() {
        this.context = new AudioContext()
    }

    async getMp3Sound(path) {
        try {
            const res = await fetch(path)
            const arrayBuffer = await res.arrayBuffer()
            return this.context.decodeAudioData(arrayBuffer)
        } catch (error) {
            console.log(error.message())
        }
    }

    async play() {
        this.createContext()
        const audioBuffer = await this.getMp3Sound(this.path)
        this.source = this.context.createBufferSource()
        this.source.buffer = audioBuffer
        this.source.loop = true
        this.source.playbackRate.value = 1
        this.source.connect(this.context.destination)
        this.source.start()
    }

    stop() {
        if (!this.source) return
        this.context.close()
        this.source.stop()
    }

    isPlaying() {
        return this.context && this.context.state === "running"
    }

}