'use strict'
module.exports = function (sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    openfrom: DataTypes.TIME,
    opento: DataTypes.TIME,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    favourite: DataTypes.BOOLEAN,
    sessionKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Place.belongsToMany(models.Keyword, {
          through: models.PlaceKeyword,
          foreignKey: 'placeId'
        })
      }
    },
    freezeTableName: true
  })
  return Place
}
