const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

//login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login-Page' });
});

//registration get & post
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register-Page' });
});

router.post(
    '/register',
    async (req, res) => {
        const { username, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.render('register', { error: { message: 'Password missmatch!!!' } });
        }
        try {
            let user = await authService.register({ username, password });

            res.redirect('/auth/login');
        } catch (err) {
            let error = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }))[0];
            res.render('register', { error });
        }
    });

module.exports = router;