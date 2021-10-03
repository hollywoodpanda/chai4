'use strict'

export class UserDTO {

    #id

    constructor (id) {
        this.#id = id
    }

    get id () { return this.#id }

    set id (id) { this.#id = id }

    toJSON () {
        return {
            'id' : this.#id
        }
    }

}