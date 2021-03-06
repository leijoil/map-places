
var path = require('path')
var express = require('express')
var server = express()
var bodyParser = require('body-parser')

var util = require('util')

var models = require('./models/index')
var sequelize = require('./models/index').sequelize

var errorMessages = null

function getAllPlaces (request, response, next) {
  console.log('request.query ', request.query)
  var timeNow = new Date()
  var currentTime = timeNow.getHours() + ':' + timeNow.getMinutes() + ':00'
  var wherePlace = {}
  wherePlace.sessionKey = request.query.sessionKey

  if (request.query.onlyfav === '1') {
    wherePlace.favourite = 1
  }

  if (request.query.onlyopen === '1') {
    wherePlace.openfrom = {$lt: currentTime}
    wherePlace.opento = {$gte: currentTime}
  }

  if (request.query.search && (request.query.search).length > 0) {
    wherePlace.title = {
      $like: '%' + request.query.search + '%'
    }
  }

  if ((request.query.keywords).length > 0) {
    console.log('request.query.keywords', request.query.keywords)
    var include = [{
      model: models.Keyword,
      where: {
        label: {
          in: (request.query.keywords).split(',')
        }
      }
    }]
  } else {
    var include = models.Keyword
  }

  models.Place.findAll({
    where: wherePlace,
    include: include || {}
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

function addPlace (request, response, next) {
  models.Place.create({
    title: request.body['title'],
    description: request.body['description'],
    openfrom: request.body['openfrom'],
    opento: request.body['opento'],
    lat: request.body['lat'],
    lng: request.body['lng'],
    favourite: request.body['favourite'],
    sessionKey: request.body['sessionKey']
  }).then(function (Place) {
    if (request.body['keywords'].length > 0) {
      for (var i = 0; i < request.body['keywords'].length; i++) {
        models.Keyword.create({
          label: request.body['keywords'][i],
          sessionKey: request.body['sessionKey']
        }).then(function (Keyword) {
          models.PlaceKeyword.create({
            placeId: Place.dataValues.id,
            keywordId: Keyword.dataValues.id,
            sessionKey: request.body['sessionKey']
          }).then(function (PlaceKeyword) {
            // console.log('PlaceKeyword', PlaceKeyword)

          })
        })
      }
    }
    return Place
  }).then(function (Place) {
    // console.log('KULLIA KANSALLE', Place)
    var sqlQuery = 'UPDATE session ' +
                    'SET saveCount = saveCount + 1 ' +
                    'WHERE sessionKey = ' + '\'' + request.body['sessionKey'] + '\''

    sequelize.query(sqlQuery).spread((results, metadata) => {
      var data = {
        error: 'false',
        message: 'New Place created successfully',
        data: Place
      }
      response.send(data)
      next()
    })
  })
}

function updatePlace (request, response, next) {
  /*
  if (!verifyRequiredParams(request)) {
    response.send(422, errorMessages)
    return
  }
  */
  console.log('SUPERKULLIA', request.body)
  models.Place.find({
    where: {
      'id': request.body['id']
    }
  }).then(function (Place) {
    if (Place) {
      Place.updateAttributes({
        title: request.body['title'],
        description: request.body['description'],
        openfrom: request.body['openfrom'],
        opento: request.body['opento'],
        lat: request.body['lat'],
        lng: request.body['lng'],
        favourite: request.body['favourite']
      }).then(function (Place) {
        console.log('YKSI')
        return deleteKeywords(request)
      }).then(function (msg) {
        console.log('TOKAVIIMEINEN', msg)
        return addNewKeywords(request)
      }).then(function (msg) {
        console.log('VIIMEINEN', msg)
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


function addNewKeywords (request) {
  return new Promise(function (resolve) {
      if (request.body['newKeywords'] && request.body['keywordsToBeAdded'].length > 0) {
          for (var i =0; i<request.body['keywordsToBeAdded'].length; i++) {
            models.Keyword.create({
              label: request.body['keywordsToBeAdded'][i],
              sessionKey: request.body['sessionKey']
            }).then(function (Keyword) {
              models.PlaceKeyword.create({
                placeId: request.body['id'],
                keywordId: Keyword.dataValues.id
              }).then(function (PlaceKeyword) {
                resolve('PlaceKeyword creation')
              })

            })
          }
      } else {
        resolve('no keywords to add')
      }
  })
}

function deleteKeywords (request) {
  return new Promise(function (resolve) {
    if (request.body['newKeywords'] && request.body['keywordsToBeDeleted'].length > 0) {
      for (var i = 0; i < request.body['keywordsToBeDeleted'].length; i++) {
        var keywordDelete = request.body['keywordsToBeDeleted'][i]
        models.Keyword.find({
          where: {
            'label': request.body['keywordsToBeDeleted'][i],
            'sessionKey': request.body['sessionKey']
          }
        }).then(function (Keyword) {
          console.log('KAKSI')
          models.PlaceKeyword.destroy({
            where: {
              'placeId': request.body['id'],
              'keywordId': Keyword.dataValues.id
            }
          }).then(function () {
            console.log('KOLME', keywordDelete)
            models.Keyword.destroy({
              where: {
                'label': keywordDelete,
                'sessionKey': request.body['sessionKey']
              }
            }).then(function (Keyword) {
              console.log('NELJA', request.body['keywordsToBeDeleted'].length)
              if(i === request.body['keywordsToBeDeleted'].length) {
                resolve('all shit deleted')
              }
            })
          })
        })
      }
    } else {
      resolve('no things to be deleted')
    }
  })
}

function deletePlace (request, response, next) {
  models.Place.destroy({
    where: {
      id: request.params.id
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
        id: request.params.id
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


/*
function addKeywordForPlace (request, response, next) {
  models.Keyword.find({
    where: {
      label: request.query['label']
    }
  }).then(function (Keyword) {
    if (Keyword) {
      var addPlaceKeywordMappingReq = {}
      addPlaceKeywordMappingReq.placeId = request.query.placeId
      addPlaceKeywordMappingReq.keywordId = Keyword.dataValues.id
      addPlaceKeywordMapping(addPlaceKeywordMappingReq)

      response.send('already exists, added mapping')
    } else {
      models.Keyword.create({
        label: request.query['label']
      }).then(function (Keyword) {
        var data = {
          error: 'false',
          message: 'New Keyword created successfully',
          data: Keyword
        }

        response.send(data)
        next()
        var addPlaceKeywordMappingReq = {}
        addPlaceKeywordMappingReq.placeId = request.query.placeId
        addPlaceKeywordMappingReq.keywordId = Keyword.dataValues.id
        addPlaceKeywordMapping(addPlaceKeywordMappingReq, response, next)
      })
    }
  })
}

*/

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
    // response.send(data)
    // next()
  })
}

function deleteKeywordForPlace (request, response, next) {
  models.PlaceKeyword.destroy({
    where: {
      placeId: request.query['placeId'],
      keywordId: request.query['keywordId']
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

/*
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
*/

function addSession (request, response, next) {
  // console.log('addSession')
  /*
  if (!verifyRequiredParams(request)) {
    response.send(422, errorMessages)
    return
  }
  */
  models.Session.create({
    sessionKey: makeId()
  }).then(function (Session) {
    var data = {
      error: 'false',
      message: 'New Session created successfully',
      data: Session
    }
    response.send(data)
    next()
  })
}

function makeId () {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getSession (request, response, next) {
  models.Session.find({
    where: {
      'sessionKey': request.params.sessionKey
    }
  }).then(function (Place) {
    var data = {
      error: 'false',
      data: Place
    }
    response.send(data)
    next()
  })
}

server.use(bodyParser.json())       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

server.use('/', express.static('public'))
server.use(/^\/([a-zA-Z0-9]{8})\/?$/, express.static('public'))

server.get('/api/v1/places', getAllPlaces)
server.get('/api/v1/places/:id', getPlace)
server.post('/api/v1/places', addPlace)
server.put('/api/v1/places/:id', updatePlace)
server.delete('/api/v1/places/:id', deletePlace)
// server.post('/api/v1/:placeId/keywords', addKeywordForPlace)
server.delete('/api/v1/:placeId/:keywordId/keywords', deleteKeywordForPlace)

server.get('/api/v1/sessions', addSession)
server.get('/api/v1/sessions/:sessionKey', getSession)

function root () {
  // console.log('root')
  // console.log(makeId())
}

function hash () {
  // console.log('hash')
}

function notfound () {
  // console.log('notfound')
}

function checkIfSessionExist (urlPath) {
  return false
}

server.listen(3000, function () {
  // console.log('REST API Server listening at http://localhost:3000')
})
