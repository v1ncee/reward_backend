const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const mongoose = require('mongoose');
const ClaimExercise = db.ClaimExercise;

module.exports = {
    getAll,
    getById,
    create,
    // update,
    // delete: _delete
};

async function getAll() {
    return await ClaimExercise.find()
        .populate('user', ['firstName', 'lastName', 'username', 'points'])
        .populate('exercise');
}

async function getById(id) {
    return await ClaimExercise.findById(id)
        .populate('user', ['firstName', 'lastName', 'username', 'points'])
        .populate('exercise');
}

async function create(userId, claimExerciseParam) {
    claimExerciseParam.user = userId;

    const claimExercise = new ClaimExercise(claimExerciseParam);
    claimExercise._id = new mongoose.Types.ObjectId();
    claimExercise.status = 'OPEN';

    // save claim
    await claimExercise.save();
}