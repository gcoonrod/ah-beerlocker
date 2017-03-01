'use strict'

exports.action = {
  name: 'getUser',
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

  run: function (api, data, next) {
    api.log(['Looking for user %s', data.params.id], 'info')
    api.models.user.findById(data.params.id)
          .then(user => {
            if (user) {
              api.log(['Found user %s', data.params.id], 'info')
              data.response = user.toJSON()
              user.getBeers()
                    .then(beers => {
                      if (beers) {
                        data.response.beers = beers
                      } else {
                        data.response.beers = []
                      }
                      next()
                    })
                    .catch(error => {
                      api.log(['Error getting beers for %s', user.username], 'error', error)
                      next(error)
                    })
            } else {
              api.log(['User %s does not exist', data.params.id], 'warning')
              if (data.connection.type === 'web') {
                data.connection.rawConnection.responseHttpCode = 404
              }
              let error = new Error('User Not Found')
              error.code = 404
              error.type = 'NOT_FOUND'
              next(error)
            }
          })
          .catch(error => {
            api.log(['Error finding user %s', data.params.id], 'error', error)
            next(error)
          })
  }
}
