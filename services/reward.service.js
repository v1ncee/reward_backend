const db = require('_helpers/db');
const Reward = db.Reward;

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Reward.find();
}

async function getById(id) {
    return await Reward.findById(id);
}

async function getByName(name) {
    return await Reward.find({name: '/.*' + name + '.*/i'});
}

async function create(rewardParam) {
    const reward = new Reward(rewardParam);
    return await reward.save();
}

async function update(id, rewardParam) {
    const reward = await Reward.findById(id);

        if (!reward) throw 'Reward not found';

    Object.assign(reward, rewardParam);
    await reward.save();
}

async function _delete(id) {
    await Reward.findByIdAndRemove(id);
}