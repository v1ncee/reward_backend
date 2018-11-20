const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    reviewed: { type: Boolean, default: false },
    comment: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercise', schema);