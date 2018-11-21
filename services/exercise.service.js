const db = require('_helpers/db');
const Exercise = db.Exercise;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Exercise.find();
}

async function getById(id) {
    return await Exercise.findById(id);
}

async function create(exParam) {
    const exercise = new Exercise(exParam);

    await exercise.save();
}

async function update(id, exParam) {
    const exercise = await Exercise.findById(id);

    if (!exercise) throw 'Exercise not found';

    Object.assign(exercise, exParam);

    await exercise.save();
}

async function _delete(id) {
    await Exercise.findByIdAndRemove(id);
}