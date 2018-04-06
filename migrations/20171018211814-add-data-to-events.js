'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('events', 'data', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('events', 'data');
  }
};
