const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

// GET /dashboard
router.get('/', withAuth, async (req, res) => {
        const response = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
            include: { model: User }
        });
        const posts = response.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn, dashboard: true });
});

// GET /dashboard/:id
router.get('/:id', withAuth, async (req, res) => {
    const response = await Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
        include: [{ model: User }, { model: Comment }]
    });
    if (!response) {
        res.status(404).json({ message: 'No posts found with that id!'});
    }
    const post = response.get({ plain: true });
    res.render('dashboard-post', { post, loggedIn: req.session.loggedIn });
});

module.exports = router;