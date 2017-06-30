'use strict'
module.exports = function (sequelize, DataTypes) {
  var PlaceKeyword = sequelize.define('PlaceKeyword', {
    placeId: DataTypes.INTEGER,
    keywordId: DataTypes.INTEGER,
    sessionKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
      }
    },
    freezeTableName: true
  })
  return PlaceKeyword
}
