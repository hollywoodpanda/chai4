'use strict'

import { PostDocumentRequestDTO } from '../../data/transfer/request/post-document-request-dto.js'
import { FileService } from '../../service/file/file-service.js'
import { log } from '../../util/constants.js'

export class FileController {

    static #fileService = new FileService()

    /**
     * 
     * @param {PostDocumentRequestDTO} postDocumentRequestDTO 
     */
    static async save (postDocumentRequestDTO) {

        // 1. Build the temporary document
        const temporaryDocument = await FileController.#fileService.saveTemporary(postDocumentRequestDTO.path)

        console.log(`${log.controller.file} Temporary document: %j`, temporaryDocument)

        // 2. Find the sheld 

    }

}