'use strict'

import dotenv from 'dotenv'
import { MainValidator } from './src/util/main-validator.js'
import { log } from './src/util/constants.js'

if (!MainValidator.validateEnvironment()) {
    console.error(`${log.main} No CHAI4_ENV found`)
    process.exit(-1)
}

// Using the file .env.CHAI4_ENV
dotenv.config({ path : `./.env.${process.env.CHAI4_ENV}` })


import { ChaiServer } from './src/server/chai-server.js'

const unhandledRejectionHandler = () => {

    process.on('unhandledRejection', err => {

        console.error(`${log.main} Unhandled rejection`, err)

        // Quit with an error code
        process.exit(Number(process.env.CHAI4_UNHANDLED_EXCEPTION_CODE))

    })

}

if (!MainValidator.validateServerParams()) {
    
    console.error(`${
        log.main
    } No host (${
        process.env.CHAI4_HOST
    }), or port (${
        process.env.CHAI4_PORT
    }) for environment ${
        process.env.CHAI4_ENV
    }`)

    process.exit(Number(process.env.CHAI4_VALIDATION_ERROR_CODE))
    
}

const server = new ChaiServer(process.env.CHAI4_HOST, process.env.CHAI4_PORT)

server.start()