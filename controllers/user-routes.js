const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

// GET /user/login
router.get('/login', (req, res) => {
    res.render('login');
});

// POST /user/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    });
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
    }).then((userData) => {
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;