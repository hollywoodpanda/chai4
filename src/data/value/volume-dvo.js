'use strict'

import { VolumeDTO } from '../transfer/volume-dto.js'

export class VolumeDVO extends VolumeDTO {

    constructor (
        path = null, 
        maxSize = process.env.CHAI4_VOLUME_MAX_SIZE
    ) {
        super(path, maxSize)
    }

    static fromDTO (dto) {
        return new VolumeDVO(dto?.path, dto?.maxSize)
    }

}