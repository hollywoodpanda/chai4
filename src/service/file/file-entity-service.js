'use strict'

import { NotImplemented } from '../../data/error/not-implemented.js'
import { DocumentDVO } from '../../data/value/document-dvo.js'
import { EntityDVO } from '../../data/value/file/entity-dvo.js'
import { ShelfDVO } from '../../data/value/shelf-dvo.js'

export class FileEntityService {

    #main

    #copies

    constructor () {

        // @TODO Create an DVO for Entities
        this.#main = new EntityDVO(
            `${process.env.CHAI4_DIRECTORY}/main`, 
            `${process.env.CHAI4_TEMP_DIRECTORY}/main`,
            true
        )

        this.#startCopies()

    }

    /**
     * 
     * @param {DocumentDVO} document
     * @param {ShelfDVO} shelf
     */
    #replicate (document, shelf) {
        throw new NotImplemented('FileEntityService.replicate(shelfedDocument)')
    }

    #startCopies () {

        // The main copies, receiving the files from time to time
        this.#copies = []

        const copiesAmount = Number(process.env.CHAI4_VOLUME_COPIES) || 0

        for (let i = 0; i < copiesAmount; i++) {

            this.addCopy(
                new EntityDVO(
                    `${process.env.CHAI4_DIRECTORY}/copy_${i + 1}`,
                    `${process.env.CHAI4_TEMP_DIRECTORY}/copy_${i + 1}`
                )
            )

        }

    }

    /**
     * 
     * @param {EntityDVO} copy The entity copy
     */
    addCopy (copy) {
        if (copy) {

            // Just to make sure it is not flagged
            // as main!
            const inceptionCopy = new EntityDVO(
                copy.volume,
                copy.tempVolume,
                false
            )

            this.#copies.push(inceptionCopy)

        }
    }

    /**
     * 
     * @param {EntityDVO} copy The entity copy
     */
    removeCopy (copy) {
        if (copy) {

            const inceptionCopy = new EntityDVO(
                copy.volume,
                copy.tempVolume,
                false
            )

            const copyIndex = this.#copies.indexOf(inceptionCopy)

            if (copyIndex >= 0) {
                this.#copies.splice(
                    this.#copies.indexOf(inceptionCopy), 
                    1
                )
            }

        }
    }

    saveDocument (document, shelf) {

        // @TODO: save in the main instance...

        // Replicating document to the copies...
        // this.#replicate(the saved document in the shelf)

        throw new NotImplemented('FileEntityService.saveDocument(document, shelf)')

    }

}