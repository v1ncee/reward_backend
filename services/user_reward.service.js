const db = require('_helpers/db');
const mongoose = require('mongoose');
const UserReward = db.UserReward;

module.exports = {
    getAll,
    getById,
    getByUserId,
    create
};

async function getAll() {
    return await UserReward.find()
        //https://www.youtube.com/watch?v=3p0wmR973Fw
        // returns a userReward object containing a user with their respective details 'username' & 'points'
        .populate('user', ['username', 'points', 'lastName'])
        .populate('reward');
}

async function getById(id) {
    return await UserReward.findById(id)
        .populate('user', ['username', 'points', 'lastName'])
        .populate('reward');
}

async function getByUserId(id) {
    return await UserReward.find(id)
        .populate('user', ['username', 'points', 'lastName', ])
        .populate('reward');
}

async function create(userId, userRewardParam) {
    userRewardParam.user = userId;

    const userReward = new UserReward(userRewardParam);
    userReward._id = new mongoose.Types.ObjectId();

    await userReward.save();
}