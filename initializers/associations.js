'use strict'

module.exports = {
  loadPriority: 1000,
  startPriority: 1002, // After models load
  stopPriority: 1000,
  initialize: function (api, next) {
    next()
  },
  start: function (api, next) {
    api.models.user.hasMany(api.models.beer)
    api.models.beer.belongsTo(api.models.user)

    next()
  },
  stop: function (api, next) {
    next()
  }
}
