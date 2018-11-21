const mongoose = require('mongoose');
var RewardSchema = require('../models/exercise.model').schema;
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    points: { type: Number, default: 0 },
    role: { type: String, required: true, default: "user" },
    purchases: [ {
        type: Schema.Types.ObjectId, ref: 'Reward'
    } ],
    exercises: [ {
        type: Schema.Types.ObjectId, ref: 'Exercise',
        claimed: {
            type: Boolean
        }
    } ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);