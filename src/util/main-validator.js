'use strict'

export class MainValidator {

    static validateEnvironment () {
        return Boolean(process.env.CHAI4_ENV)
    }

    static validateServerParams () {
        return process.env.CHAI4_HOST && process.env.CHAI4_PORT
    }

}