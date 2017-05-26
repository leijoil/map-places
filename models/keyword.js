'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    label: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Keyword.belongsToMany( models.Place, {
            through: models.PlaceKeyword
        });
      }
    },
    freezeTableName: true
  });
  return Keyword;
};