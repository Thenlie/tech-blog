const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// GET /user
router.get('/', async (req, res) => {
    const response = await User.findAll({
        attributes: ['id', 'username', 'password']
    });
    res.json(response);
});

// POST /user/login
router.post('/login', async (req, res) => {
    try {
        const response = await User.findOne({
            where: { username: req.body.username }
        });
        if (!response) {
            res.status(404);
            return;
        }
        const validPassword = response.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(404);
            return;
        }
        req.session.save(() => {
            req.session.username = response.username;
            req.session.user_id = response.id;
            req.session.loggedIn = true;
            res.json({ user: response.username, message: 'You are now logged in!'  });;
        })   
    }
    catch (err) {
        res.status(500);
    }
});

// POST /user/signup
router.post('/signup', async (req, res) => {
    try {
        const response = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.username = response.username;
            req.session.user_id = response.id;
            req.session.loggedIn = true;
            res.json(response);
        });
    }
    catch (err) {
        res.status(500);
    };
});

// GET /user/logout
router.get('/logout', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.status(404).end()
    }
    req.session.destroy(() => {
        res.status(200).end();
    });
});

module.exports = router;