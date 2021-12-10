const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const response = await Post.findAll({
            attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
            include: [
                { model: User, attributes: ['username'] }, 
                { model: Comment, include: { model: User } }]
        });
        const posts = response.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, home: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET /login
router.get('/login', (req, res) => {
    res.render('login', { login: true });
});

// GET /signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;