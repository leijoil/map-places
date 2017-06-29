'use strict'
module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    sessionKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
      }
    },
    freezeTableName: true
  })
  return Session
}
