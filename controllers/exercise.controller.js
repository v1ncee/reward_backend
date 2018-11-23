const express = require('express');
const router = express.Router();
const exerciseService = require('../services/exercise.service');
const permissions = require('../_helpers/permissions');


// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    exerciseService.create(req.body)
        .then(exercise => res.json(exercise))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    exerciseService.getAll()
        .then(exercises => res.json(exercises))
        .catch(err => next(err));
}

function getById(req, res, next) {
    exerciseService.getById(req.params.id)
        .then(exercise => exercise ? res.json(exercise) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    exerciseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    exerciseService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}