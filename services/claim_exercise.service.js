const db = require('_helpers/db');
const mongoose = require('mongoose');
const ClaimExercise = db.ClaimExercise;

module.exports = {
    getAll,
    getById,
    create
};

async function getAll() {
    return await ClaimExercise.find()
        //https://www.youtube.com/watch?v=3p0wmR973Fw
        // returns a claimexercise object containing a user with their respective details 'username' & 'points'
        .populate('user', ['username', 'points', 'lastName'])
        .populate('exercise');
}

async function getById(id) {
    return await ClaimExercise.findById(id)
        .populate('user', ['username', 'points', 'lastName'])
        .populate('exercise');
}

async function create(userId, claimExerciseParam) {
    claimExerciseParam.user = userId;

    const claimExercise = new ClaimExercise(claimExerciseParam);
    claimExercise._id = new mongoose.Types.ObjectId();
    claimExercise.status = 'PENDING';

    await claimExercise.save();
}