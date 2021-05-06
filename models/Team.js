const mongoose = require('mongoose');

const teamScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 250,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    players: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Player'
        }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Team', teamScheme);