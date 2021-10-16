'use strict'

import { ShelfDTO } from '../shelf-dto.js'

// @TODO: Should accept a base64 binary string or a path
export class PostDocumentRequestDTO {

    #userId

    #path

    #shelfId

    /**
     * 
     * @param {String} path The file's path to be saved in the Chai4 storage system 
     * @param {String} shelfId The shelf where the document will be stored
     * @param {String} userId The caller's id (the identifier of the user calling the post document functionality)
     */
    constructor (path, shelfId, userId) {
        this.#path = path
        this.#shelfId = shelfId
        this.#userId = userId
    }

    get path () { return this.#path }

    get shelfId () { return this.#shelfId }

    get userId () { return this.#userId }

    toJSON () {
        return {
            'path' : this.path,
            'shelfId' : this.shelfId,
            'userId' : this.userId 
        }
    }

}