'use strict'

exports.action = {
  name: 'createBeer',
  description: 'Create a beer',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

  inputs: {
    name: {required: true},
    type: {},
    quantity: {},
    description: {}
  },

  run: function (api, data, next) {
    let newBeer = {
      name: data.params.name,
      type: data.params.type,
      quantity: data.params.quantity,
      description: data.params.description
    }

    let options = {
      returning: true
    }

    api.log(['Creating new beer: %s', newBeer.name], 'info')
    api.models.beer.create(newBeer, options)
            .then(beer => {
              api.log(['New beer %s created successfully.', beer.name], 'info', {beer: beer.toJSON()})
              data.response = beer.toJSON()
              next()
            })
            .catch(error => {
              api.log(['Error creating new beer!'], 'error', error)
              next(error)
            })
  }
}
