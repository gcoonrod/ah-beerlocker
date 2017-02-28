'use strict';

module.exports = function(sequelize, DataTypes, api) {
    return sequelize.define("Beer", {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        description: DataTypes.TEXT
    })
}
