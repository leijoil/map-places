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
                title: 'Elokuvateatteri Kino Indie',
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
            },
            {
                title: 'Ravintola Täysi Maha',
                description: 'Hyvää kotiruokaa halvalla!',
                openfrom: '11:30:00',
                opento: '21:00:00',
                lat: 54.171969,
                lng: 22.928608
            },
            {
                title: 'Parturi-kampaamo Geelitukka',
                description: 'Halpa hiustenleikkuu',
                openfrom: '10:00:00',
                opento: '18:30:00',
                lat: 59.201969,
                lng: 22.128608
            },
            {
                title: 'Huvipuisto',
                description: 'Hauska paikka vietää vapaa-aikaa',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 59.221969,
                lng: 26.118608
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('place', null, {});
    }
};