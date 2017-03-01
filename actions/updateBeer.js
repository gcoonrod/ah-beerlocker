'use strict'

exports.action = {
    name: 'updateBeer',
    description: 'My Action',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        id: { required: true }
    },

    run: function(api, data, next) {
    api.log(['Looking for beer %s to edit.', data.params.id], 'info')
    api.models.beer.findById(data.params.id)
            .then(beer => {
              if (beer) {
                api.log(['Beer %s found.', data.params.id], 'info')
                beer.updateAttributes(data.params)
                        .then(updatedBeer => {
                          api.log(['Beer %s updated successfully', data.params.id], 'info', {beer: updatedBeer.toJSON()})
                          data.response = updatedBeer.toJSON()
                          next()
                        })
                        .catch(error => {
                          api.log(['Beer %s update failed', data.params.id], 'error', error)
                          if (data.connection.type === 'web') {
                            data.connection.rawConnection.responseHttpCode = 500
                          }
                          next(error)
                        })
              } else {
                api.log(['Beer %s does not exist', data.params.id], 'warning')
                if (data.connection.type === 'web') {
                  data.connection.rawConnection.responseHttpCode = 404
                }
                let error = new Error('Beer Not Found')
                error.code = 404
                error.type = 'NOT_FOUND'
                next(error)
              }
            })
            .catch(error => {
              api.log(['Error finding beer %s', data.params.id], 'error', error)
              next(error)
            })
  }
}
