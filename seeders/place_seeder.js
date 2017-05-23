'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('place', [
            {
                title: 'Kahvila Kesäheinä',
                description: 'Erittäin hauska kahvila lähellä rantaa',
                openfrom: '12:00:00',
                opento: '18:00:00',
                lat: 60.171969,
                lng: 24.928608
            },
            {
                title: 'Elokuvateatteri kino jotain',
                description: 'Hyviä indie-leffoja',
                openfrom: '06:00:00',
                opento: '10:00:00',
                lat: 59.171969,
                lng: 25.928608
            },
            {
                title: 'Pussikalja spotti',
                description: 'Auringonlasku tulee tähän hyvin',
                openfrom: '00:00:00',
                opento: '00:00:00',
                lat: 61.171969,
                lng: 23.928608
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('place', null, {});
    }
};