'use strict'

export class BadRequest extends Error {
    constructor (message) {
        super(`Opsy! Bad request here :-( ${message}`)
    }
}