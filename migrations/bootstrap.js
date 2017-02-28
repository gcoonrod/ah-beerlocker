'use strict';

const Promise = require('bluebird');

module.exports = {
    up: function(migration, DataTypes){
        return Promise.all([
            migration.createTable('beer', {
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
        ])
            .then(function(){
                return Promise.all([
                    migration.addIndex('beer', ['name'], {
                        indexName: 'beer_name_index',
                        indicesType: 'UNIQUE'
                    })
                ])
            })
    },
    down: function(migration, DataTypes){
        return Promise.all([
            migration.dropTable('beer')
        ]);
    }
}
