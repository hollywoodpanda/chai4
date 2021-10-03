'use strict'

export class AccountDTO {

    #name

    #users

    constructor (name, users) {
        this.#name = name
        this.#users = users
    }

    get name () { return this.#name }

    set users (users) { this.#users = users }

    get users () { return this.#users }

    toJSON () {
        return {
            'name' : this.#name,
            'users' : this.#users
        }
    }

}