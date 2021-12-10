const { Post } = require('../models');
const router = require('express').Router();

// GET /dashboard
router.get('/', async (req, res) => {
        const response = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['title', 'content', 'user_id', 'createdAt']
        });
        const posts = response.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;