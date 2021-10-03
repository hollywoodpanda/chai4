'use strict'

export class ShelfDTO {

    #id

    #name
    
    #account

    #volume

    #maxSize

    constructor (
        id,
        name,
        account,
        volume,
        maxSize
    ) {
        this.#id = id
        this.#name = name
        this.#account = account
        this.#volume = volume
        this.#maxSize = maxSize
    }

    get id () { return this.#id }

    get name () { return this.#name }

    get account () { return this.#account }

    get volume () { return this.#volume }

    get maxSize () { return this.#maxSize }

    toJSON () {
        return {
            'id' : this.#id,
            'name' : this.#name,
            'account' : this.#account,
            'volume' : this.#volume,
            'maxSize' : this.#maxSize
        }
    }

}