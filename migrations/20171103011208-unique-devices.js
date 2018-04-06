'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addIndex('devices', ['advertising_identifier'], {
        indexName: 'idx_devices_advertising_identifier',
        indicesType: 'unique',
      }),
      queryInterface.addIndex('devices', ['vendor_identifier'], {
        indexName: 'idx_devices_vendor_identifier',
        indicesType: 'unique',
      }),
      queryInterface.addIndex('devices', ['web_identifier'], {
        indexName: 'idx_devices_web_identifier',
        indicesType: 'unique',
      }),
    ]);

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeIndex('devices', 'idx_devices_advertising_identifier'),
      queryInterface.removeIndex('devices', 'idx_devices_vendor_identifier'),
      queryInterface.removeIndex('devices', 'idx_devices_web_identifier'),
    ]);

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
