const { Router } = require('express');
const playerService = require('../services/playerService');
const router = Router();


const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createPlayer');
});

router.post('/create', isAuthenticated, (req, res) => {
    playerService.create(req.body)
        .then(() => res.redirect('/teams'))
        .catch(() => res.status(500).end());
});

module.exports = router;