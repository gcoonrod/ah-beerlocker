'use strict'

module.exports = {
  up: function (migration, DataTypes) {
    return migration.addColumn('beers', 'userId', DataTypes.UUID)
  },

  down: function (migration, DataTypes) {
    return migration.addColumn('beers', 'userId')
  }
}
