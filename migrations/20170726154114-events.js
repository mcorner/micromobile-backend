'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('events', {
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
      eventType: {
        field: 'event_type',
        type: Sequelize.STRING,
        allowNull: false
      },
      eventSubtype: {
        field: 'event_subtype',
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('events');
  }
};
