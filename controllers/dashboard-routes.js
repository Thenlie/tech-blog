const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Comment, Post, User } = require('../models');

router.get('/', (req, res) => {
    res.render('dashboard');
})

module.exports = router;