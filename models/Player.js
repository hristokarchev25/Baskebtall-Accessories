const mongoose = require('mongoose');

const playerScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    imageUrl: String,
    description: String,
});

module.exports = mongoose.model('Player', playerScheme);