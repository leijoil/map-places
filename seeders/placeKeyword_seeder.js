'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('PlaceKeyword', [
            {
                placeId: 1,
                keywordId: 1
            },
            {
                placeId: 1,
                keywordId: 2
            },
            {
                placeId: 1,
                keywordId: 2
            },
            {
                placeId: 2,
                keywordId: 4
            },
            {
                placeId: 3,
                keywordId: 5
            },
            {
                placeId: 4,
                keywordId: 6
            },
            {
                placeId: 5,
                keywordId: 6
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('PlaceKeyword', null, {});
    }
};