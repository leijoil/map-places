var restify = require('restify');
var restifyValidator = require('restify-validator');
var util = require('util');

var models = require('./models/index');

var error_messages = null;

function getAllPlaces(request,response,next){
    models.place.findAll({})
        .then(function(places) {
        var data = {
            error: "false",
            data: places
        };

        response.send(data);
        next();
    });
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);

server.get('/api/v1/places',getAllPlaces);
/*
server.get('/api/v1/places/:id',getPlace);
server.post('/api/v1/places',addPlace);
server.put('/api/v1/places/:id',updatePlace);
server.del('/api/v1/places/:id',deletePlace);
*/

server.listen(4000, function() {
    console.log('REST API Server listening at http://localhost:4000');
});
