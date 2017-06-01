var restify = require('restify')
var restifyValidator = require('restify-validator')
var util = require('util')

var models = require('./models/index')

var errorMessages = null

function getAllPlaces (request, response, next) {
  var timeNow = new Date()
  var currentTime = timeNow.getHours() + ':' + timeNow.getMinutes() + ':00'
  var wherePlace = {}

  if (request.params.onlyfav === '1') {
    wherePlace.favourite = 1
  }

  if (request.params.onlyopen === '1') {
    wherePlace.openfrom = {$lt: currentTime}
    wherePlace.opento = {$gte: currentTime}
  }

  if ((request.params.search).length > 0) {
    wherePlace.title = {
      $like: '%' + request.params.search + '%'
    }
  }

  if ((request.params.keywords).length > 0) {
    var include = [{
      model: models.Keyword,
      where: {
        label: {
          in: (request.params.keywords).split(',')
        }
      }
    }]
  } else {
    var include = models.Keyword
  }

  models.Place.findAll({
    where: wherePlace,
    include: include
  }).then(function (places) {
    var data = {
      error: 'false',
      data: places
    }
    response.send(data)
    next()
  })
}

function getPlace (request, response, next) {
  models.Place.find({
    where: {
      'id': request.params.id
    },
    include: models.Keyword
  }).then(function (Place) {
    var data = {
      error: 'false',
      data: Place
    }

    response.send(data)
    next()
  })
}

function verifyRequiredParams (request) {
  request.assert('title', 'title field is required').notEmpty()
  request.assert('description', 'description field is required').notEmpty()
  request.assert('openfrom', 'openfrom field is required').notEmpty()
  request.assert('opento', 'opento field is required').notEmpty()
  request.assert('lat', 'lat field is required').notEmpty()
  request.assert('lng', 'lng field is required').notEmpty()
  request.assert('favourite', 'favourite field is required').notEmpty()

  var errors = request.validationErrors()
  if (errors) {
    errorMessages = {
      error: 'true',
      message: util.inspect(errors)
    }

    return false
  } else {
    return true
  }
}

function addPlace (request, response, next) {
  if (!verifyRequiredParams(request)) {
    response.send(422, errorMessages)
    return
  }

  models.Place.create({
    title: request.params['title'],
    description: request.params['description'],
    openfrom: request.params['openfrom'],
    opento: request.params['opento'],
    lat: request.params['lat'],
    lng: request.params['lng'],
    favourite: request.params['favourite']
  }).then(function (Place) {
    var data = {
      error: 'false',
      message: 'New Place created successfully',
      data: Place
    }

    response.send(data)
    next()
  })
}

function updatePlace (request, response, next) {
  if (!verifyRequiredParams(request)) {
    response.send(422, errorMessages)
    return
  }

  models.Place.find({
    where: {
      'id': request.params.id
    }
  }).then(function (Place) {
    if (Place) {
      Place.updateAttributes({
        title: request.params['title'],
        description: request.params['description'],
        openfrom: request.params['openfrom'],
        opento: request.params['opento'],
        lat: request.params['lat'],
        lng: request.params['lng'],
        favourite: request.params['favourite']
      }).then(function (Place) {
        var data = {
          error: 'false',
          message: 'Updated Place successfully',
          data: Place
        }

        response.send(data)
        next()
      })
    }
  })
}

function deletePlace (request, response, next) {
  models.Place.destroy({
    where: {
      id: request.params['id']
    }
  }).then(function (Place) {
    var data = {
      error: 'false',
      message: 'Deleted Place successfully',
      data: Place
    }
    response.send(data)
    next()
    models.PlaceKeyword.destroy({
      where: {
        id: request.params['id']
      }
    }).then(function (PlaceKeyword) {
      var data = {
        error: 'false',
        message: 'Deleted PlaceKeyword successfully',
        data: PlaceKeyword
      }
      response.send(data)
      next()
    })
  })
}

function addKeywordForPlace (request, response, next) {
  models.Keyword.find({
    where: {
      label: request.params['label']
    }
  }).then(function (Keyword) {
    if (Keyword) {
      var addPlaceKeywordMappingReq = {}
      addPlaceKeywordMappingReq.placeId = request.params.placeId
      addPlaceKeywordMappingReq.keywordId = Keyword.dataValues.id
      addPlaceKeywordMapping(addPlaceKeywordMappingReq)

      response.send('already exists, added mapping')
    } else {
      models.Keyword.create({
        label: request.params['label']
      }).then(function (Keyword) {
        var data = {
          error: 'false',
          message: 'New Keyword created successfully',
          data: Keyword
        }

        response.send(data)
        next()
        var addPlaceKeywordMappingReq = {}
        addPlaceKeywordMappingReq.placeId = request.params.placeId
        addPlaceKeywordMappingReq.keywordId = Keyword.dataValues.id
        addPlaceKeywordMapping(addPlaceKeywordMappingReq, response, next)
      })
    }
  })
}

function addPlaceKeywordMapping (request, response, next) {
  models.PlaceKeyword.create({
    placeId: request.placeId,
    keywordId: request.keywordId
  }).then(function (PlaceKeyword) {
    var data = {
      error: 'false',
      message: 'New PlaceKeyword created successfully',
      data: PlaceKeyword
    }
    response.send(data)
    next()
  })
}

function deleteKeywordForPlace (request, response, next) {
  models.PlaceKeyword.destroy({
    where: {
      placeId: request.params['placeId'],
      keywordId: request.params['keywordId']
    }
  }).then(function (Place) {
    var data = {
      error: 'false',
      message: 'Deleted Keyword for Place successfully',
      data: Place
    }
    response.send(data)
    next()
  })
}

var server = restify.createServer()

server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restifyValidator)

server.get('/api/v1/places', getAllPlaces)
server.get('/api/v1/places/:id', getPlace)
server.post('/api/v1/places', addPlace)
server.put('/api/v1/places/:id', updatePlace)
server.del('/api/v1/places/:id', deletePlace)
server.post('/api/v1/:placeId/keywords', addKeywordForPlace)
server.del('/api/v1/:placeId/:keywordId/keywords', deleteKeywordForPlace)

server.get(/\/?.*/, restify.serveStatic({
  directory: 'public/',
  default: 'index.html'
}))

server.listen(3000, function () {
  console.log('REST API Server listening at http://localhost:3000')
})
