const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/teams');
    //res.render('home', { title: "Home" })
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About-Page' });
});


module.exports = router;