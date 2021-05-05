const { Router } = require('express');


const teamController = require('./controllers/teamController');
const playerController = require('./controllers/playerController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/teams', teamController);
router.use('/players', playerController);


module.exports = router;