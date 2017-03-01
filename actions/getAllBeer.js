'use strict'

exports.action = {
    name: 'getAllBeer',
    description: 'List all beers',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {}, //TODO: Filter by type, quantity, favorite

    run: function(api, data, next) {
        let error = null
        // your logic here

        api.log(['Getting list of all beers'], 'info')
        api.models.beer.findAll({raw: true})
            .then(beers => {
                api.log(['Successfully found beers'], 'info')
                data.response = beers
                next()
            })
            .catch(error => {
                api.log(['Error finding beers!'], 'error', error)
                next(error)
            })
    }
}
