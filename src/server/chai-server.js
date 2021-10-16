'use strict'

import Hapi from '@hapi/hapi'
import { BadRequest } from '../data/error/bad-request.js'
import { PostDocumentRequestDTO } from '../data/transfer/request/post-document-request-dto.js'
import { FileController } from '../controller/file/file-controller.js'

import { log, server } from '../util/constants.js'

export class ChaiServer {

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
        this.#startPostDocumentRoute()
    }

    #startGetDocumentRoute () {

        this.#server.route({
            method : 'GET',
            path : '/',
            handler : (request, h) => {

                console.log(`${log.server.service} GET / Chai4 document route ${JSON.stringify(request?.query)}`)

                // @TODO: Do something more useful... Like the whole shenanigans.
                return 'Chai4 File Shelfilizer'

             }
        })

    }

    #startPostDocumentRoute () {

        this.#server.route({
            method : 'POST',
            path : '/',
            options : {

                payload : server.config.payload,

            },
            handler : async (request, h) => {

                console.log(`${log.server.service} POST / Chai4 document route`)

                // @TODO: We must accept a base64 binary as well...?
                const payload = request?.payload

                const userId = request?.headers?.['x-chai4-userid']

                console.log(`${log.server.service} headers: %j`, request?.headers)

                console.log(`\n\n\n ${log.server.service} PAYLOAD: \n\n\n`, payload)

                const requestDTO = new PostDocumentRequestDTO(payload.path, 'test', userId)

                // Validating the request!
                // @TODO Improve the validation logic and messaging.
                if (!requestDTO?.path || !requestDTO?.shelfId || !requestDTO?.userId) {
                    console.error(`${log.server.service} Opsyyy!`)
                    throw new BadRequest(`Missing information in the create document route ${JSON.stringify(requestDTO)}`)
                }

                console.log(`${log.server.service} The request DTO: %j`, requestDTO)

                return await FileController.save(requestDTO)

            },
        })

    }

}