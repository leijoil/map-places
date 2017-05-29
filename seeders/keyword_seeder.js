'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Keyword', [
      {
        label: 'restaurant'
      },
      {
        label: 'bar'
      },
      {
        label: 'other'
      },
      {
        label: 'friend'
      },
      {
        label: 'hotel'
      },
      {
        label: 'sports'
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Keyword', null, {})
  }
}
