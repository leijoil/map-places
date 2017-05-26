'use strict';
module.exports = function(sequelize, DataTypes) {
  var PlaceKeyword = sequelize.define('PlaceKeyword', {
    placeId: DataTypes.INTEGER,
    keywordId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return PlaceKeyword;
};