const Player = require('../models/Player');
const Team = require('../models/Team')


async function getAll(query) {
    let teams = await Team.find({}).lean();


    if (query.search) {
        teams = teams.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        teams = teams.filter(x => Number(x.level) >= query.from);
    }

    if (query.to) {
        teams = teams.filter(x => Number(x.level) <= query.to);
    }

    return teams;
};


function create(data, userId) {
    let team = new Team({ ...data, creator: userId });

    return team.save();
};


module.exports = {
    getAll,
    create
}