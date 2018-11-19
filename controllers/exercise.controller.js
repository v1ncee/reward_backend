const express = require('express');
const router = express.Router();
const exerciseService = require('../services/exercise.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    exerciseService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    exerciseService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    exerciseService.getById(req.params.id)
        .then(task => task ? res.json(task) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    exerciseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    exerciseService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}