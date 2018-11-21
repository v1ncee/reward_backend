const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    reviewed: { type: Boolean, default: false },
    image: { type: String, required: true },
    comment: { type: String, default: ""}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercise', schema);