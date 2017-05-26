'use strict';
module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    openfrom: DataTypes.TIME,
    opento: DataTypes.TIME,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Place.belongsToMany( models.Keyword, {
            through: models.PlaceKeyword
        });
      }
    },
    freezeTableName: true
  });
  return Place;
};