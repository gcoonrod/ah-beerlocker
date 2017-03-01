'use strict'

exports.action = {
  name: 'removeUser',
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
      api.log(['Looking for user %s to remove', data.params.id], 'info')
      api.models.user.findById(data.params.id)
          .then(user => {
              if (user) {
                  api.log(['Found user %s', data.params.id], 'info')
                  return user.destroy()
                      .then(() => {
                          api.log(['User %s removed', data.params.id], 'info')
                          if (data.connection.type === 'web') {
                              data.connection.rawConnection.responseHttpCode = 204
                          }
                          data.response = {}
                          next()
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
