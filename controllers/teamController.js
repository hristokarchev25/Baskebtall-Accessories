const { Router, response } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');

const teamService = require('../services/teamServices');
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


module.exports = router;