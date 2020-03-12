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
serviceQuestion.getAll = getAll;

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

function getAll(){
    var deferred = Q.defer();

<<<<<<< HEAD
    db.questions.find().toArray(function (err, questions) {
=======
    db.questions.find()(function (err) {
>>>>>>> 179e068da47005acc822555532df92f4a31fe3fb
        if (err) deferred.reject(err.description + ': ' + err.message);

        if (questions) {
            deferred.resolve(questions);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}
<<<<<<< HEAD

=======
>>>>>>> 179e068da47005acc822555532df92f4a31fe3fb
