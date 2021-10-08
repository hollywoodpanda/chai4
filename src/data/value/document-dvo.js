'use strict'

import MIME from 'mime'

import { DocumentDTO } from '../transfer/document-dto.js';

export class DocumentDVO extends DocumentDTO {

    constructor (
        name,
        mime = MIME.getType('txt'), // Defaulting to a txt file (if no mime is specified)
        path,
        shelfId = null // Defaulting to no shelfId (using null instead of undefined if no shelfId is specified)
    ) {
        super(
            name,
            mime,
            path,
            shelfId
        )
    }

    static fromDTO (dto) {

        return new DocumentDVO(
            dto?.name,
            dto?.mime,
            dto?.path,
            dto?.shelfId
        )

    }

}