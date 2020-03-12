var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var serviceQuestion = {};

serviceQuestion.create = create;

module.exports = serviceQuestion;

function create(questionParam){
    var deferred = Q.defer();

    db.questions.insert(
        questionParam,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    
        return deferred.promise;

}
