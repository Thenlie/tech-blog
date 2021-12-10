const router = require('express').Router();
const { User } = require('../models');

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
            res.status(404).json({ message: 'No user found with that username!' });
            return;
        }
        const validPassword = response.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(404).json({ message: 'No user found with that password!' });
            return;
        }
        req.session.save(() => {
            req.session.username = response.username;
            req.session.user_id = response.id;
            req.session.loggedIn = true;
            res.json(response);
        })   
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST /user/signup
router.post('/signup', async (req, res) => {
    try {
        const response = User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.username = response.username;
            req.session.user_id = response.id;
            req.session.loggedIn = true;
            res.json(response);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
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