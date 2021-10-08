'use strict'

export class NotAuthorized extends Error {
    
    constructor (username, documentName) {
        super(`The user ${username} is not authorized to use document ${documentName}`)
    }
}