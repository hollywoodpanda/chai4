'use strict'

import { NotImplemented } from '../../data/error/not-implemented.js'
import { DocumentDVO } from '../../data/value/document-dvo.js'
import { EntityDVO } from '../../data/value/file/entity-dvo.js'
import { ShelfDVO } from '../../data/value/shelf-dvo.js'

import fs from 'fs/promises'
import MIME from 'mime'
import { log } from '../../util/constants.js'

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
        
        const promises = []

        for (let copy of this.#copies) {
            promises.push(this.#save(document, shelf, copy))
        }

        return Promise.all(promises)

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

    #pathExists (path) {

        return fs.access(path, fs.constants.R_OK)

    } 

    saveTemporaryDocument (file, shelf) {

        return this.#saveTemporary(file, shelf, this.#main)

    }

    /**
     * 
     * @param {DocumentDVO} document 
     * @param {ShelfDVO} shelf 
     */
    async saveDocument (document, shelf) {

        await this.#save(document, shelf, this.#main)

        // Replicating document to the copies...
        await this.#replicate(document, shelf)

    }

    async #saveTemporary (file, shelf, entity) {

        const folder = `${entity.tempVolume}/${shelf.name}`

        // @TODO: save in the main instance...
        const folderExists = await this.#pathExists(folder)

        if (!folderExists)
            await fs.mkdir(folder)

        const path = `${folder}/${file.hapi.filename}`

        const stream = fs.createWriteStream(path)

        return new Promise((resolve, reject) => {

            file.on('error', err => {

                console.error(`${log.service.file} Opsy! Error reading file (error) ${path}`, err)

                reject(err)

            })

            file.pipe(stream)

            file.on('end', err => {

                if (err) {
                    console.error(`${log.service.file} Opsy! Error reading file (end) ${path}`, err)
                    reject(err)
                }

                const document = new DocumentDVO(file.hapi.filename, file.hapi.headers['content-type'], folder, shelf.id)

                console.log(`${log.service.file} Temporary document saved %j`, document)

                resolve(document)

            })

        })    

        // Writing the file
        await fs.writeFile(`${folder}/${document?.filename}`, file)

    }

    async #save (document, shelf, entity) {

        const folder = `${entity.volume}/${shelf.name}`
        //const tempFolder = `${entity.tempVolume}/${shelf.name}`

        // @TODO: save in the main instance...
        const folderExists = await this.#pathExists(folder)
        //const tempFolderExists = await this.#pathExists(tempFolder)

        if (!folderExists)
            await fs.mkdir(folder)

        //if (!tempFolderExists)
        //    await fs.mkdir(tempFolder)

        // Getting the file object
        const documentFile = await fs.readFile(document?.filepath)

        // Writing the file
        await fs.writeFile(`${folder}/${document?.filename}`, documentFile)

    }

}