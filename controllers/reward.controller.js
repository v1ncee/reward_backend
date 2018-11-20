const express = require('express');
const router = express.Router();
const rewardService = require('../services/reward.service');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const httpMsgs = require('http-msgs');
const jwtLogin = require('jwt-login');
const roles = require("user-groups-roles");

// Roles
roles.createNewRole("admin");
roles.createNewRole("user");

// Privileges
roles.createNewPrivileges(['/rewards', "GET"], "this gets all rewards", true);
roles.createNewPrivileges(['/rewards/:id', "GET"], "this gets reward by id", true);
roles.createNewPrivileges(['/rewards', "POST"], "this posts new reward", false);
roles.createNewPrivileges(['/rewards/:id', "PUT"], "this edits reward", false);
roles.createNewPrivileges(['/rewards/:id', "DELETE"], "this deletes reward", false);

// Admin Privileges
roles.addPrivilegeToRole("admin", ['/rewards', "POST"], true);
roles.addPrivilegeToRole("admin", ['/rewards:id', "PUT"], true);
roles.addPrivilegeToRole("admin", ['/rewards:id', "DELETE"], true);

// User Pivileges
roles.addPrivilegeToRole("user", ['/rewards', "GET"], true);


// routes
router.get('/', getAll);
router.post('/', create);

router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    rewardService.getAll()
        .then(rewards => res.json(rewards))
        .catch(err => next(err));
}

function create(req, res, next) {
    rewardService.create(req.body)
        .then(reward => res.json(reward))
        .catch(err => next(err));
}

function getById(req, res, next) {
    rewardService.getById(req.params.id)
        .then(reward => reward ? res.json(reward) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    rewardService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    rewardService.delete(req.params.id)
        .then(() => res.json({
            "succes": true
        }))
        .catch(err => next(err));
}