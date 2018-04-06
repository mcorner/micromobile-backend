'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('push_subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
        allowNull: false
      },
      deviceId: {
        field: 'device_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'devices',
          key: 'id'
        },
      },
      path: {
        field: 'path',
        type: Sequelize.STRING,
        allowNull: false
      },
    }).then(() =>{
      return queryInterface.addIndex('push_subscriptions', ['device_id', 'path'], {
        indicesType: 'unique',
        indexName: 'idx_push_subscriptions_device_path'
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('push_subscriptions');
  }
};
