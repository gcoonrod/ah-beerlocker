'use strict'

exports.action = {
  name: 'updateUser',
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
    api.log(['Looking for user %s to edit.', data.params.id], 'info')
    api.models.user.findById(data.params.id)
          .then(user => {
            if (user) {
              api.log(['User %s found.', data.params.id], 'info')
              user.updateAttributes(data.params)
                      .then(updatedUser => {
                        api.log(['User %s updated successfully', data.params.id], 'info', {user: updatedUser.toJSON()})
                        data.response = updatedUser.toJSON()
                        next()
                      })
                      .catch(error => {
                        api.log(['User %s update failed', data.params.id], 'error', error)
                        if (data.connection.type === 'web') {
                          data.connection.rawConnection.responseHttpCode = 500
                        }
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
