const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
<<<<<<< HEAD
    name: { type: String, unique: true, required: true },
=======
    title: { type: String, required: true },
    description: { type: String, required: true },
>>>>>>> 114baaab6ba667c4b532e3409c73596eb86c9b41
    points: { type: Number, default: 0 }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reward', schema);
