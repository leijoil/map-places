'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Place', [
      {
        title: 'Coffee House 9th Level',
        description: 'Nice coffee shop at good location',
        openfrom: '12:00:00',
        opento: '18:00:00',
        lat: 60.226723,
        lng: 24.923532,
        favourite: 1
      },
      {
        title: 'Cinema Kino Indie',
        description: 'Best indie movies in town',
        openfrom: '06:00:00',
        opento: '10:00:00',
        lat: 60.175284,
        lng: 24.931623,
        favourite: 0
      },
      {
        title: 'Skate Park',
        description: 'Nice place to skate and bike',
        openfrom: '00:00:00',
        opento: '00:00:00',
        lat: 60.216723,
        lng: 24.976392,
        favourite: 0
      },
      {
        title: 'Restaurant That Has No name',
        description: 'Excellent ribs',
        openfrom: '11:30:00',
        opento: '21:00:00',
        lat: 60.156801,
        lng: 24.955793,
        favourite: 1
      },
      {
        title: 'Barber Shop Jimmy',
        description: 'Cheap haircut',
        openfrom: '10:00:00',
        opento: '18:30:00',
        lat: 60.165004,
        lng: 24.904119,
        favourite: 1
      },
      {
        title: 'Theme Park',
        description: 'Lots of fun in here',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.185836,
        lng: 25.003339,
        favourite: 1
      },
      {
        title: 'Football Field',
        description: 'Football in summer and ice hockey in winter',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.209965,
        lng: 24.904649,
        favourite: 0
      },
      {
        title: 'Church',
        description: 'Weddings here',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.230151,
        lng: 24.995458,
        favourite: 0
      },
      {
        title: 'Tony\'s house',
        description: 'The new home of Toni',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.243517,
        lng: 24.992475,
        favourite: 0
      },
      {
        title: 'Bowling place',
        description: 'Bowling and table tennis',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.241425,
        lng: 24.908685,
        favourite: 1
      },
      {
        title: 'Swimming hall',
        description: 'Swimming hall with long tracks',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.259810,
        lng: 24.825014,
        favourite: 1
      },
      {
        title: 'Irish Bar Old Barrel',
        description: 'Good athmosphere and selection of beers',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.217961,
        lng: 24.786761,
        favourite: 1
      },
      {
        title: 'Car Repair Shop',
        description: 'They fix windscreens',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.188711,
        lng: 24.974717,
        favourite: 1
      },
      {
        title: 'Pizza Restaurant Little Italy',
        description: 'Best quattro stagioni in town',
        openfrom: '10:00:00',
        opento: '22:00:00',
        lat: 60.274210,
        lng: 24.833109,
        favourite: 1
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Place', null, {})
  }
}
