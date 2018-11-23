const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    comment: { type: String, required: true },
    status: {
        type: String,
        enum : ['PENDING', 'CLAIMED', 'NOT-CLAIMED'],
        default: 'PENDING'
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ClaimExercise', schema);