const Player = require('../models/Player');




function getAllWithout(ids) {
    return Player.find({ _id: { $nin: ids } }).lean();
};

module.exports = {
    getAllWithout,
}