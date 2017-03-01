'use strict';

const Promise = require('bluebird');

module.exports = {
    up: function(migration, DataTypes){
        return Promise.all([
            migration.createTable('beers', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: DataTypes.STRING,
                type: DataTypes.STRING,
                quantity: DataTypes.INTEGER,
                description: DataTypes.TEXT,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            })
        ])
            .then(function(){
                return Promise.all([
                    migration.addIndex('beers', ['name'], {
                        indexName: 'beers_name_index',
                        indicesType: 'UNIQUE'
                    })
                ])
            })
    },
    down: function(migration, DataTypes){
        return Promise.all([
            migration.dropTable('beers')
        ]);
    }
}
