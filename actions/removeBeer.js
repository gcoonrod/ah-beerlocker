'use strict'

exports.action = {
    name: 'removeBeer',
    description: 'My Action',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        id: {required: true}
    },

    run: function(api, data, next) {
        let error = null
        api.log(['Looking for beer %s to remove', data.params.id], 'info')
        api.models.beer.findById(data.params.id)
            .then(beer => {
                if (beer) {
                    api.log(['Found beer %s', data.params.id], 'info')
                    beer.destroy()
                        .then(() => {
                            api.log(['Beer %s removed', data.params.id], 'info')
                            if (data.connection.type === 'web') {
                                data.connection.rawConnection.responseHttpCode = 204
                            }
                            data.response = {}
                            next()
                        })
                } else {
                    api.log(['Beer %s does not exist', data.params.id], 'warning')
                    if (data.connection.type === 'web') {
                        data.connection.rawConnection.responseHttpCode = 404
                    }
                    error = new Error('Beer Not Found')
                    error.code = 404
                    error.type = 'NOT_FOUND'
                    next(error)
                }

            })
            .catch(error => {
                api.log(['Error finding beer %s', data.params.id], 'error', error);
                next(error)
            })
    }
}
