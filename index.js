'use strict'

import dotenv from 'dotenv'

// Using the file .env.CHAI4_ENV
dotenv.config({ path : `./.env.${process.env.CHAI4_ENV}` })

import { log } from './src/util/constants.js'
import { ServerService } from './src/server/server-service.js'

const validateServerParams = () => {

    return process.env.CHAI4_HOST && process.env.CHAI4_PORT

}

const unhandledRejectionHandler = () => {

    process.on('unhandledRejection', err => {

        console.error(`${log.server.main} Unhandled rejection`, err)

        // Quit with an error code
        process.exit(1)

    })

}

if (!validateServerParams()) {
    
    console.error(`${log.server.main} No host or port informed for environment ${process.env.CHAI4_ENV}`)

    process.exit(-1)
    
}

const server = new ServerService(process.env.CHAI4_HOST, process.env.CHAI4_PORT)

server.start()