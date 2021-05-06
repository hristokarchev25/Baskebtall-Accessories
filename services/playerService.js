const Player = require('../models/Player');

function getAll() {
    return Player.find().lean();
}

function create(data) {
    let player = new Player(data);

    return player.save();
};

function getAllWithout(ids) {
    return Player.find({ _id: { $nin: ids } }).lean();
};

module.exports = {
    getAllWithout,
    create,
    getAll,
}