'use strict'


export const log = {
    main : '[main]',
    server : {
        service : '[server][service]'
    },
    service : {
        file : '[service][file]'
    },
    controller : {
        file : '[controller][file]'
    }
}

export const server = {
    config : {
        payload : {
            maxBytes : 5242880,
            parse : true,
            output : 'file'
        }
    }
}
