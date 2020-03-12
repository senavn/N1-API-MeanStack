var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/create', registerQuestion);
router.get('/', getAllQuestions);
router.delete('/:_id', deleteQuestion);

module.exports = router;

function registerQuestion(req, res) {
    questionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllQuestions(req, res){
    questionService.getAll()
    .then(function (questions) {
        if (questions) {
            res.send(questions);
        } else {
            res.sendStatus(404);
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function deleteQuestion(req, res) {
    questionService.delete(req.params._id)
        .then(function () {
            res.send(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

