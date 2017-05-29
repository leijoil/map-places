'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Place', [
            {
                title: 'Kahvila Kesäheinä',
                description: 'Erittäin hauska kahvila lähellä rantaa',
                openfrom: '12:00:00',
                opento: '18:00:00',
                lat: 60.196723,
                lng: 24.923532,
                favourite: 1
            },
            {
                title: 'Elokuvateatteri Kino Indie',
                description: 'Hyviä indie-leffoja',
                openfrom: '06:00:00',
                opento: '10:00:00',
                lat: 60.175284,
                lng: 24.931623,
                favourite: 0
            },
            {
                title: 'Pussikalja spotti',
                description: 'Auringonlasku tulee tähän hyvin',
                openfrom: '00:00:00',
                opento: '00:00:00',
                lat: 60.184723,
                lng: 24.976392,
                favourite: 0
            },
            {
                title: 'Ravintola Täysi Maha',
                description: 'Hyvää kotiruokaa halvalla!',
                openfrom: '11:30:00',
                opento: '21:00:00',
                lat: 60.156801,
                lng: 24.955793,
                favourite: 1
            },
            {
                title: 'Parturi-kampaamo Geelitukka',
                description: 'Halpa hiustenleikkuu',
                openfrom: '10:00:00',
                opento: '18:30:00',
                lat: 60.165004,
                lng: 24.904119,
                favourite: 1
            },
            {
                title: 'Huvipuisto',
                description: 'Hauska paikka vietää vapaa-aikaa',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.185836,
                lng: 25.003339,
                favourite: 1
            },
            {
                title: 'Urheilukenttä',
                description: 'Jalkapalloa ja muuta urheilua',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.199965,
                lng: 24.904649,
                favourite: 0
            },
            {
                title: 'Kirkko',
                description: 'Häät ja hautajaiset',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.230151,
                lng: 24.995458,
                favourite: 0
            },
            {
                title: 'Tonin koti',
                description: 'Tonin uusi koti Lauttasaaressa',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.163517,
                lng: 24.881475,
                favourite: 0
            },
            {
                title: 'Keilahalli',
                description: 'Keilailu ja sisäpelit',
                openfrom: '10:00:00',
                opento: '22:00:00',
                lat: 60.201425,
                lng: 24.908685,
                favourite: 1
            }
        ], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Place', null, {});
    }
};