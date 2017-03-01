'use strict'

module.exports = function (sequelize, DataTypes, api) {
  return sequelize.define('user', {
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
    }
  })
}
