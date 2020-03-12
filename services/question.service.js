var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var serviceQuestion = {};

serviceQuestion.getAll = getAll;
serviceQuestion.create = create;
serviceQuestion.delete = _delete;

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

    db.questions.find().toArray(function (err, questions) {
        if (err) deferred.reject(err.description + ': ' + err.message);

        if (questions) {
            deferred.resolve(questions);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
