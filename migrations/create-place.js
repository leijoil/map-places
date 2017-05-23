'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('place', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      openfrom: {
        type: Sequelize.TIME
      },
      opento: {
        type: Sequelize.TIME
      },
      lat: {
        type: Sequelize.DECIMAL(10, 8)
      },
      lng: {
        type: Sequelize.DECIMAL(11, 8)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('place');
  }
};