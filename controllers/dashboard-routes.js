const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Comment, Post, User } = require('../models');

// GET /dashboard
router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: req.session.loggedIn });
});

module.exports = router;