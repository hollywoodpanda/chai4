'use strict'

export class DocumentDTO {
    
    #name

    #mime

    #path

    #shelfId
    
    construtor (
        name,
        mime,
        path,
        shelfId
    ) {
        this.#name = name
        this.#mime = mime
        this.#path = path
        this.#shelfId = shelfId
    }

    get name () { return this.#name }

    get mime () { return this.#mime }

    get path () { return this.#path }

    get shelfId () { return this.#shelfId }

    toJSON () {
        return {
            'name' : this.#name,
            'mime' : this.#mime,
            'path' : this.#path,
            'shelfId' : this.#shelfId
        }
    }

}