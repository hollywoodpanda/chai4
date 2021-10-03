'use strict'

export class AuthorizationDVO extends AuthorizationDTO {

    constructor (
        documentName = null,
        shelfId = null,
        accounts = []
    ) {
        super(documentName, shelfId, accounts)
    }

    fromDTO (dto) {
        return new AuthorizationDVO(
            dto?.documentName,
            dto?.shelfId,
            dto?.accounts
        )
    }
    
}