'use strict'

import { InvalidVolume } from "../../error/file/invalid-volume.js"

export class EntityDVO {

    #volume

    #tempVolume

    #maxSize

    #main

    constructor (
        volume,
        tempVolume,
        main
    ) {
        this.#volume = this.#startVolume(volume)
        this.#tempVolume = this.#startVolume(tempVolume)
        this.#maxSize = Number(process.env.CHAI4_VOLUME_MAX_SIZE)
        this.#main = Boolean(main)
    }

    get main () { return this.#main }

    set main (main) { this.#main = Boolean(main) }

    get volume () { return this.#volume }

    get tempVolume () { return this.#tempVolume }

    get maxSize () { return this.#maxSize }

    #startVolume (volume) {
        if (!volume) {
            throw new InvalidVolume(volume)
        }
        return volume
    }

}