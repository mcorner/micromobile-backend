'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('raw_event_logs', {
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
      eventAt: {
        field: 'event_at',
        type: Sequelize.DATE,
        allowNull: false
      },
      lambdaRequestId: {
        field: 'lambda_request_id',
        type: Sequelize.STRING,
        allowNull: false
      },
      deviceId: {
        field: 'device_id',
        type: Sequelize.INTEGER,
        allowNull: false,
//        references: {
//          model: 'devices',
//          key: 'id'
//        },
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
      impression: {
        field: 'impression',
        type: Sequelize.STRING,
        allowNull: true
      },
      referrer: {
        field: 'referrer',
        type: Sequelize.STRING,
        allowNull: true
      },
    }).then(() =>{
      return queryInterface.addIndex('raw_event_logs', ['lambda_request_id'], {
        indicesType: 'unique',
        indexName: 'idx_raw_event_logs_lambda_request_id'
      });
    }).then(() =>{
      return queryInterface.addIndex('raw_event_logs', ['event_at'], {
        indexName: 'idx_raw_event_logs_event_at'
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('raw_event_logs');
  }
};
