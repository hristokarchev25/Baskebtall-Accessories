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

function getOneWithPlayers(id) {
    return Team
        .findById(id)
        .populate('players')
        .lean();
};

function getOne(id) {
    return Team.findById(id).lean();

};

function updateOne(teamId, teamData) {
    return Team.updateOne({ _id: teamId }, teamData);
};

function deleteOne(teamId) {
    return Team.deleteOne({ _id: teamId });
};

async function attachPlayer(teamId, playerId) {
    let team = await Team.findById(teamId);
    let player = await Player.findById(playerId);
    team.players.push(player);
    return team.save();
};

module.exports = {
    getAll,
    create,
    getOneWithPlayers,
    getOne,
    updateOne,
    deleteOne,
    attachPlayer,
}