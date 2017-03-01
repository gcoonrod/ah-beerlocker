'use strict'

module.exports = function (sequelize, DataTypes, api) {
  return sequelize.define('beer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  })
}
