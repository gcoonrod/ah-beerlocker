'use strict'

exports.action = {
  name: 'getAllUser',
  description: 'My Action',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

  inputs: {},

  run: function (api, data, next) {
      api.log(['Getting list of all users'], 'info')
      api.models.user.findAll({raw: true})
          .then(users => {
              api.log(['Successfully found users'], 'info')
              data.response = users
              next()
          })
          .catch(error => {
              api.log(['Error finding users!'], 'error', error)
              next(error)
          })
  }
}
