'use strict'

import Hapi from '@hapi/hapi'

import { log } from '../util/constants.js'

export class ServerService {

    #host

    #port

    #server

    constructor (host, port) {
        this.#host = host
        this.#port = port
    }

    async start () {

        console.log(`${
            log.server.service
        } Starting server at  ${
            this.#host
        }:${
            this.#port
        }`)

        this.#server = Hapi.server({
            port : this.#port,
            host : this.#host
        })

        this.#startRoutes()

        await this.#server.start()

        console.log(`${
            log.server.service
        } Server running at ${
            this.#host
        }:${
            this.#port
        }`)

    }

    #startRoutes () {
        this.#startGetDocumentRoute()
    }

    #startGetDocumentRoute () {

        this.#server.route({
            method : 'GET',
            path : '/',
            handler : (request, h) => {

                console.log(`${log.server.service} GET chai4 document route`)

                // @TODO: Do something more useful... Like the whole shenanigans.
                return 'Hello Chai4 World!'

             }
        })

    }

}