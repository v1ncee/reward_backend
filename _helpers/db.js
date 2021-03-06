const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Exercise: require('../models/exercise.model'),
    Reward: require('../models/reward.model'),
    ClaimExercise: require('../models/claim_exercise.model'),
    UserReward: require('../models/user_reward.model'),
};