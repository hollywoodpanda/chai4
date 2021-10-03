'use strict'

export class VolumeDTO {

    #path

    #maxSize

    constructor (path, maxSize) {
        this.#path = path
        this.#maxSize = maxSize
    }

    get path () { return this.#path }

    get maxSize () { return this.#maxSize }

    toJSON () {
        return {
            'path' : this.#path,
            'maxSize': this.#maxSize
        }
    }

}