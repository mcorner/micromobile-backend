'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('devices', {
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
      pushToken: {
        field: 'push_token',
        type: Sequelize.STRING,
        allowNull: true
      },
      advertisingIdentifier: {
        field: 'advertising_identifier',
        type: Sequelize.STRING,
        allowNull: true
      },
      vendorIdentifier: {
        field: 'vendor_identifier',
        type: Sequelize.STRING,
        allowNull: true
      },
      webIdentifier: {
        field: 'web_identifier',
        type: Sequelize.STRING,
        allowNull: true
      },
      platform: {
        field: 'platform',
        type: Sequelize.STRING,
        allowNull: false
      },
      userAgent: {
        field: 'device_os',
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('devices');
  }
};
