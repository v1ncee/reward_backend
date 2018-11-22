const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    image: { type: String},
    comment: { type: String, default: ""}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercise', schema);