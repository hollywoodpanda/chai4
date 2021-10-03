'use strict'

export class AccountDVO extends AccountDTO {
    
    constructor (name = null, users = []) {
        super(name, users)
    }

    static fromDTO (dto) {
        return new AccountDVO(
            dto?.name,
            dto?.users
        )
    }

}