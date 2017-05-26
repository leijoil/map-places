var restify = require('restify');
var restifyValidator = require('restify-validator');
var util = require('util');

var models = require('./models/index');

var error_messages = null;

function getAllPlaces(request,response,next){
    models.Place.findAll({
        include: models.Keyword
        })
        .then(function(places) {
        var data = {
            error: "false",
            data: places
        };

        response.send(data);
        next();
    });
}

function getPlace(request,response,next){

    models.Place.find({
        where: {
            'id': request.params.id
        }
    }).then(function(Place) {
        var data = {
            error: "false",
            data: Place
        };

        response.send(data);
        next();
    });
}

function verifyRequiredParams(request){
    request.assert('title', 'title field is required').notEmpty();
    request.assert('description', 'description field is required').notEmpty();
    request.assert('openfrom', 'openfrom field is required').notEmpty();
    request.assert('opento', 'opento field is required').notEmpty();
    request.assert('lat', 'lat field is required').notEmpty();
    request.assert('lat', 'lng field is required').notEmpty();

    var errors = request.validationErrors();
    if (errors) {
        error_messages = {
            error: "true",
            message : util.inspect(errors)
        };

        return false;
    }else{
        return true;
    }
}

function addPlace(request,response,next){
    if (!verifyRequiredParams(request)){
        response.send(422,error_messages);
        return;
    }

    models.Place.create({
        title: request.params['title'],
        description: request.params['description'],
        openfrom: request.params['openfrom'],
        opento: request.params['opento'],
        opento: request.params['opento'],
        lat: request.params['lat'],
        lng: request.params['lng']
    }).then(function(Place) {
        var data = {
            error: "false",
            message: "New Place created successfully",
            data: Place
        };

        response.send(data);
        next();
    });
}

function updatePlace(request,response,next){
    if (!verifyRequiredParams(request)){
        response.send(422,error_messages);
        return;
    }

    models.Place.find({
        where: {
            'id': request.params.id
        }
    }).then(function(Place) {
        if(Place){
            Place.updateAttributes({
              title: request.params['title'],
              description: request.params['description'],
              openfrom: request.params['openfrom'],
              opento: request.params['opento'],
              opento: request.params['opento'],
              lat: request.params['lat'],
              lng: request.params['lng']
            }).then(function(Place) {
                var data = {
                    error: "false",
                    message: "Updated Place successfully",
                    data: Place
                };

                response.send(data);
                next();
            });
        }
    });
}

function deletePlace(request,response,next){
    models.Place.destroy({
        where: {
            id: request.params['id']
        }
    }).then(function(Place) {
        var data = {
            error: "false",
            message: "Deleted Place successfully",
            data: Place
        };

        response.send(data);
        next();
    });
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);

server.get('/api/v1/places', getAllPlaces);
server.get('/api/v1/places/:id', getPlace);
server.post('/api/v1/places', addPlace);
server.put('/api/v1/places/:id', updatePlace);
server.del('/api/v1/places/:id', deletePlace);

server.get(/\/?.*/, restify.serveStatic({
            directory: __dirname,
            default: 'index.html'
            // match: /^((?!app.js).)*$/
     }));

server.listen(3000, function() {
    console.log('REST API Server listening at http://localhost:3000');
});
