'use strict'

const Promise = require('bluebird')

module.exports = {
  up: function (migration, DataTypes) {
    return Promise.all([
      migration.createTable('users', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        givenName: DataTypes.STRING,
        familyName: DataTypes.STRING,
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      })
    ])
        .then(function () {
          return Promise.all([
            migration.addIndex('users', ['username'], {
              indexName: 'users_username_index',
              indicesType: 'UNIQUE'
            })
          ])
        })
  },

  down: function (migration, DataTypes) {
    return Promise.all([
      migration.dropTable('users')
    ])
  }
}
