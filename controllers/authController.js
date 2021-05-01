const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


//login get & post
router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login-Page' });
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('login', { error });
    }
});

//registration get & post
router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register-Page' });
});

router.post(
    '/register',
    isGuest,
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

//logout
router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/teams');
});
module.exports = router;