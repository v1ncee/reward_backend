const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    comment: { type: String, required: true },
    status: {
        type: String,
        enum : ['OPEN', 'CLAIMED', 'NOT-CLAIMED'],
        default: 'NOT-CLAIMED'
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ClaimExercise', schema);