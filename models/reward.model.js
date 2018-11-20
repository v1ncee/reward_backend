const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // name: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, default: 0 }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reward', schema);
