'use strict'

export class AuthorizationDTO {

    #documentName

    #shelfId

    #accounts

    construtor (
        documentName,
        shelfId,
        accounts
    ) {

        this.#documentName = documentName
        this.#shelfId = shelfId
        this.#accounts = accounts

    }

    get documentName () { return this.#documentName }

    get shelfId () { return this.#shelfId }

    get accounts () { return this.#accounts }

    toJSON () {
        return {
            'documentName' : this.#documentName,
            'shelfId' : this.#shelfId,
            'accounts' : this.#accounts
        }
    }

}