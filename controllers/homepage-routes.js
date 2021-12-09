const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
        include: {
            model: User
        }
    }).then(postData => {
        const posts = postData.map(post => post.get({ plain: true }))
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;