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
        //throw new NotImplemented('SecurityService.getAccounts()')
        
        // @TODO: Remove this terrible mock
        const user = new UserDVO('jack')
        const accounts = []

        accounts.push(new AccountDVO(
            'chai4_dev',
            [user]
        ))

        return accounts

    }

    /**
     * 
     * @param {String} documentName 
     * @returns {AuthorizationDVO}
     */
    static #getAuthorization (documentName) {
        //throw new NotImplemented('SecurityService.getAuthorizarion(documentName)')
        // @TODO: Remove this stupid mock
        return new AuthorizationDVO(documentName, 'shelf_dev', SecurityService.#getAccounts())
    }

    /**
     * 
     * @TODO: We should be looking if the user has some account authorizing
     * him to write into the specified shelf and if this account is the same
     * authorizing it for the specified documentName. We're only cheking the
     * document authorization so far 💆 
     * 
     * @TODO: If the file is new, there's no definition of it in our storage,
     * we should create an authorization for the user account associated with
     * the shelf's authorization and STOP VALIDATING if the authorization for a
     * document we never heard about exists.
     * 
     * @param {UserDVO} user 
     * @param {String} documentName
     * @returns {AccountDVO}
     */
    static getAuthorizedAccount (user, documentName) {

        if (user && documentName) {

            const authorization = this.#getAuthorization(documentName)

            if(!authorization)
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