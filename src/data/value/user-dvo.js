'use strict'

export class UserDVO extends UserDTO {

    constructor (id = null) { // Defaulting to null if no id is provided
        super(id)
    }

    static fromDTO (dto) {
        return new UserDVO(dto?.id)
    }

}