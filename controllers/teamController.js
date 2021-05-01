const { Router, response } = require('express');

const teamService = require('../services/teamServices');
const router = Router();

router.get('/', (req, res) => {
  //  teamService.getAll(req.query)
        //.then(teams => {

            res.render('home', { title: 'Browse', /* teams */ });
        //})
        //.catch(() => res.status(500).end());
});


module.exports = router;