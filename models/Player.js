const mongoose = require('mongoose');

const playerScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        maxlength: 25,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    description: {
        type: String,
        required: true,
        maxlength: 250,
    }
});

module.exports = mongoose.model('Player', playerScheme);
