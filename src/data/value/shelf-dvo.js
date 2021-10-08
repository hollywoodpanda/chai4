'use strict'

import { ShelfDTO } from '../transfer/shelf-dto.js'

export class ShelfDVO extends ShelfDTO {

    constructor (
        id = null,
        name = null,
        account = null,
        volume = null,
        maxSize = process.env.CHAI4_SHELF_MAX_SIZE
    ) {
        super(
            id,
            name,
            account,
            volume,
            maxSize
        )
    }
    
    static fromDTO () {
        return new ShelfDVO(
            dto?.id,
            dto?.name,
            dto?.account,
            dto?.volume,
            dto?.maxSize
        )
    } 

}