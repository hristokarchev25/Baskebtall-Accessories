const { Router, response } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');

const teamService = require('../services/teamServices');
const playerService = require('../services/playerService');
const router = Router();

router.get('/', (req, res) => {
    teamService.getAll(req.query)
        .then(teams => {

            res.render('home', { title: 'Browse', teams });
        })
        .catch(() => res.status(500).end());
});

//create
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create-Page' });
});

router.post('/create', isAuthenticated, (req, res, next) => {
    teamService.create(req.body, req.user._id)
        .then(() => res.redirect('/teams'))
        .catch(next);
});

//details
router.get('/details/:teamId', async (req, res) => {
    let team = await teamService.getOneWithPlayers(req.params.teamId);

    res.render('details', { title: 'Details-Product-Page', team });
});

//edit
router.get('/:teamId/edit', isAuthenticated, (req, res) => {
    teamService.getOne(req.params.teamId)
        .then(team => {
            res.render('edit', team);
        });
});

router.post('/:teamId/edit', isAuthenticated, (req, res) => {
    teamService.updateOne(req.params.teamId, req.body)
        .then(response => {
            res.redirect(`/teams/details/${req.params.teamId}`);
        })
        .catch(error => {
            console.log(error);
        });
});

//delete
router.get('/:teamId/delete', isAuthenticated, (req, res) => {
    teamService.getOne(req.params.teamId)
        .then(team => {
            res.render('delete', team);
        })
        .catch(err => console.log(err));
});

router.post('/:teamId/delete', isAuthenticated, (req, res) => {
    teamService.deleteOne(req.params.teamId)
        .then(response => res.redirect('/teams'))
        .catch(err => console.log(err));
});

//attach
router.get('/:teamId/attach', isAuthenticated, async (req, res) => {
    let team = await teamService.getOne(req.params.teamId);
    let players = await playerService.getAllWithout(team.players);

    res.render('attachPlayer', { team, players });
});

router.post('/:teamId/attach', isAuthenticated, (req, res) => {
    teamService.attachPlayer(req.params.teamId, req.body.player)
        .then(() => res.redirect(`/teams/details/${req.params.teamId}`))
});


module.exports = router;