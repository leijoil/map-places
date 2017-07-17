'use strict'
module.exports = function (sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    label: {
      type: DataTypes.STRING,
      validate: { len: [1, 15] }
    },
    sessionKey: DataTypes.STRING
  }, {
    freezeTableName: true
  })

  Keyword.associate = function (models) {
    Keyword.belongsToMany(models.Place, {
      through: models.PlaceKeyword,
      foreignKey: 'keywordId'
    })
  }

  return Keyword
}
