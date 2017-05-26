'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PlaceKeyword', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      keywordId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PlaceKeyword');
  }
};