const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { 
        type: String, 
        require: true
    }
});

module.exports = mongoose.model('genres', genreSchema);