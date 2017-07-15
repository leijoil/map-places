'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Session', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionKey: {
        allowNull: false,
        type: Sequelize.STRING
      },
      saveCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Session')
  }
}
