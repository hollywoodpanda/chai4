'use strict'

export class InvalidVolume extends Error {

    constructor (volume) {
        super(`The volume '${volume}' is invalid`)
    }

}