


async function getAll(query) {
    let teams = await Cube.find({}).lean();


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
}





module.exports = {
    getAll,
}