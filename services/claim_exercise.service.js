const db = require('_helpers/db');
const mongoose = require('mongoose');
const ClaimExercise = db.ClaimExercise;

module.exports = {
    getAll,
    getById,
    update,
    create
};

async function getAll() {
    return await ClaimExercise.find()
        //https://www.youtube.com/watch?v=3p0wmR973Fw
        // returns a claimexercise object containing a user with their respective details 'username', 'points' & 'lastName'
        .populate('user', ['username', 'points', 'lastName'])
        .populate('exercise');
}

async function getById(id) {
    return await ClaimExercise.findById(id)
        .populate('user', ['username', 'points', 'lastName'])
        .populate('exercise');
}

async function update(id, exParam) {
    const claimExercise = await ClaimExercise.findById(id);

        if (!claimExercise) throw 'Exercise not found';

    Object.assign(claimExercise, exParam);
    await claimExercise.save();
}

async function create(userId, claimExerciseParam) {
    claimExerciseParam.user = userId;

    const claimExercise = new ClaimExercise(claimExerciseParam);
    claimExercise._id = new mongoose.Types.ObjectId();
    claimExercise.status = 'NOT-CLAIMED';

    await claimExercise.save();
}