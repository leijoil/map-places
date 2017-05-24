'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('place', [
            {
                title: 'Kahvila Kesäheinä',
                description: 'Erittäin hauska kahvila lähellä rantaa',
                openfrom: '12:00:00',
                opento: '18:00:00',
                lat: 60.196723,
                lng: 24.923532
            },
            {
                title: 'Elokuvateatteri Kino Indie',
                description: 'Hyviä indie-leffoja',
                openfrom: '06:00:00',
                opento: '10:00:00',
                lat: 60.175284,
                lng: 24.931623
            },
            {
                title: 'Pussikalja spotti',
                description: 'Auringonlasku tulee tähän hyvin',
                openfrom: '00:00:00',
                opento: '00:00:00',
                lat: 60.184723,
                lng: 24.976392
            },
            {
                title: 'Ravintola Täysi Maha',
                description: 'Hyvää kotiruokaa halvalla!',
                openfrom: '11:30:00',
                opento: '21:00:00',
                lat: 60.156801,
                lng: 24.955793
            },
            {
                title: 'Parturi-kampaamo Geelitukka',
                description: 'Halpa hiustenleikkuu',
                openfrom: '10:00:00',
                opento: '18:30:00',
                lat: 60.165004,
                lng: 24.904119
            },
            {
                title: 'Huvipuisto',
                description: 'Hauska paikka vietää vapaa-aikaa',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.185836,
                lng: 25.003339
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('place', null, {});
    }
};