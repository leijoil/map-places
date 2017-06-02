'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PlaceKeyword', [
      {
        placeId: 1,
        keywordId: 1
      },
      {
        placeId: 1,
        keywordId: 5
      },
      {
        placeId: 2,
        keywordId: 3
      },
      {
        placeId: 3,
        keywordId: 6
      },
      {
        placeId: 4,
        keywordId: 1
      },
      {
        placeId: 5,
        keywordId: 3
      },
      {
        placeId: 6,
        keywordId: 3
      },
      {
        placeId: 6,
        keywordId: 6
      },
      {
        placeId: 7,
        keywordId: 6
      },
      {
        placeId: 8,
        keywordId: 3
      },
      {
        placeId: 9,
        keywordId: 4
      },
      {
        placeId: 10,
        keywordId: 6
      },
      {
        placeId: 11,
        keywordId: 6
      },
      {
        placeId: 12,
        keywordId: 2
      },
      {
        placeId: 13,
        keywordId: 3
      },
      {
        placeId: 14,
        keywordId: 1
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PlaceKeyword', null, {})
  }
}
