const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, require: true},
    author: { type: String, require: true},
    genre: { type: mongoose.Types.ObjectId, ref: 'genres' },
    publicYear: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema)