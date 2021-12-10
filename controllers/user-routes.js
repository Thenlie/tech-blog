const router = require('express').Router();
const { User } = require('../models');

// GET /user
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'password']
    }).then(userData => {
        res.json(userData);
    });
});

// GET /user/login
router.get('/login', (req, res) => {
    res.render('login');
});

// POST /user/login
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    }).then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with that username!' });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(404).json({ message: 'No user found with that password!' });
            return;
        }
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json(userData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /user/signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST /user/signup
router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(userData => {
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json(userData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /user/logout
router.get('/logout', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(404).end()
    }
    req.session.destroy(() => {
        res.status(200).end();
    });
});

module.exports = router;