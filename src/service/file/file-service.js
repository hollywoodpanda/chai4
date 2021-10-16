'use strict'

import { FileEntityService } from './file-entity-service.js'

import { DocumentDVO } from '../../data/value/document-dvo.js'

import { ShelfDVO } from '../../data/value/shelf-dvo.js'
import { SecurityService } from '../security/security-service.js'
import { UserDVO } from '../../data/value/user-dvo.js'
import { NotAuthorized } from '../../data/error/security/not-authorized.js'
import { log } from '../../util/constants.js'

import { v4 as uuidv4 } from 'uuid'

export class FileService {

    #fileEntityService

    constructor () {
        this.#fileEntityService = new FileEntityService()
    }

    async saveTemporary (file) {

        const originalName = file?.hapi?.filename

        console.log(`${log.service.file} File original name is ${originalName}`)

        const id = uuidv4()

        const shelf = new ShelfDVO(
            id,
            `TEMP_${id}`
        )

        console.log(`${log.service.file} Shelf: %j`, shelf)

        const document = await this.#fileEntityService.saveTemporaryDocument(file, shelf)

        console.log(`${log.service.file} The created temporary document: %j`, document)

        return document

    }

    /**
     * 
     * @param {DocumentDVO} document The document object
     * @param {ShelfDVO} shelf The shelf object 
     * @param {UserDVO} user
     */
    add (document, shelf, user) {

        console.log(`${
            log.service.file
        } User '${
            user?.id
        }' adding document '${
            document?.name
        }' to shelf '${
            shelf?.name
        }'`)

        const authorizedAccount = SecurityService.getAuthorizedAccount(
            user, 
            document.name
        )

        if (!authorizedAccount) {
         
            console.error(`${
                log.service.file
            } User '${
                user?.id
            }' not authorized to save document '${
                document?.name
            }' to shelf '${
                shelf?.name
            }'`)

            throw new NotAuthorized(user.id, document.name)

        }

        console.log(`${
            log.service.file
        } The account is authorized to save the document '${
            document?.name
        }'`)

        this.#fileEntityService.saveDocument(document, shelf)

    }

}