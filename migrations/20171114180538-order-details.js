'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('order_details', {
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
      orderId: {
        field: 'order_id',
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false
      },
    }).then(() =>{
      return queryInterface.addIndex('order_details', ['order_id'], {
        indicesType: 'unique',
        indexName: 'idx_order_details_order_id'
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('order_details');
  }
};
