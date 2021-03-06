const express = require('express');
const router = express.Router();
const rewardService = require('../services/reward.service');
const permissions = require('../_helpers/permissions');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.get('/name/:name', getByName);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    rewardService.getAll()
        .then(rewards => res.json(rewards))
        .catch(err => next(err));
}

function create(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }
    
    rewardService.create(req.body)
        .then(reward => res.json(reward))
        .catch(err => next(err));
}

function getById(req, res, next) {
    rewardService.getById(req.params.id)
        .then(reward => reward ? res.json(reward) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    rewardService.getByName(req.params.name)
        .then(reward => reward ? res.json(reward) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    rewardService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    rewardService.delete(req.params.id)
        .then(() => res.json({
            "succes": true
        }))
        .catch(err => next(err));
}