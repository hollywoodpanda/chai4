'use strict'

export class NotImplemented extends Error {
    constructor (functionality) {
        super(`The functionality '${functionality}' is not implemented yet`)
    }
}