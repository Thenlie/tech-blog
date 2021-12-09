const router = require('express').Router();
const { Post } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'createdAt']
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