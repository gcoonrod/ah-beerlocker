'use strict'

exports.action = {
  name: 'createUser',
  description: 'My Action',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

  inputs: {
    givenName: {},
    familyName: {},
    username: { required: true }
  },

  run: function (api, data, next) {
    let newUser = {
      givenName: data.params.givenName,
      familyName: data.params.familyName,
      username: data.params.username
    }

    let options = {
      returning: true
    }

    api.log(['Creating new user: %s', data.params.username], 'info')
    api.models.user.create(newUser, options)
          .then(user => {
            api.log(['New user %s created successfully'], 'info', {user: user.toJSON()})
            data.response = user.toJSON()
            next()
          })
          .catch(error => {
            api.log(['Error creating new user!'], 'error', error)
            next(error)
          })
  }
}
