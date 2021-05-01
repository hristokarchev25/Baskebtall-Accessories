const { Router } = require('express');


const teamController = require('./controllers/teamController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/teams', teamController);


module.exports = router;