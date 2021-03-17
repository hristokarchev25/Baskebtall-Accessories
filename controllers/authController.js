const { Router } = require('express');
const router = Router();

const { COOKIE_NAME } = require('../config/config');

//login
router.get('/login',  (req, res) => {
    res.render('login', { title: 'Login-Page' });
});


module.exports = router;