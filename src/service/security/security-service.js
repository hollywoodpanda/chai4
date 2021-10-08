'use strict'

import { NotImplemented } from '../../data/error/not-implemented.js'
import { AccountDVO } from '../../data/value/account-dvo.js'
import { AuthorizationDVO } from '../../data/value/authorization-dvo.js'
import { UserDVO } from '../../data/value/user-dvo.js'

export class SecurityService {

    /**
     * @returns {Array<AccountDVO>}
     */
    static #getAccounts () {
        throw new NotImplemented('SecurityService.getAccounts()')
    }

    /**
     * 
     * @param {String} documentName 
     * @returns {AuthorizationDVO}
     */
    static #getAuthorization (documentName) {
        throw new NotImplemented('SecurityService.getAuthorizarion(documentName)')
    }

    /**
     * 
     * @param {UserDVO} user 
     * @param {String} documentName
     * @returns {AccountDVO}
     */
    static getAuthorizedAccount (user, documentName) {

        if (user && documentName) {

            const authorization = this.#getAuthorization(documentName)

            if(! authorization)
                return null

            const userAccounts 
                = this.#getAccounts()
                    .filter(account => account.users.indexOf(user) >= 0)

            if (userAccounts.length) {

                return userAccounts.find(account => authorization.accounts.indexOf(account) >= 0) || null

            }        

        }

        return null

    }

}