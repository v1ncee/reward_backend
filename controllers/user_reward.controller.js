const express = require('express');
const router = express.Router();
const userRewardService = require('../services/user_reward.service');
const permissions = require('../_helpers/permissions');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    userRewardService.create(req.user.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userRewardService.getAll()
        .then(claims => res.json(claims))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userRewardService.getById(req.params.id)
        .then(claim => claim ? res.json(claim) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    userRewardService.getById(req.params.user)
        .then(claim => claim ? res.json(claim) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    userRewardService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    if (permissions.check(req, "admin")) {
        return permissions.throw(res);
    }

    userRewardService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}