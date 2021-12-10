const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET /post/
router.get('/', async (req, res) => {
    try {
        const response = await Post.findAll({
        attributes: ['id', 'title', 'user_id'],
        include: [
            { model: User, attributes: ['username'] },
            { model: Comment, attributes: ['content']}
        ]
        });
        res.json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET /post/1
router.get('/:id', async (req, res) => {
    try {
        const response = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: { model: User }}
            ]
        });
        if (!response) {
            res.status(404).json({ message: 'No posts found with this ID!' });
            return;
        }
        const post = response.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// POST /post/
router.post('/', async (req, res) => {
    try {
        const response = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id 
        })
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// PUT /post/
// router.put('/:id', (req, res) => {
//     Post.update({
        // where: {
        //     id: req.params.id
        // },
//     });
// });

// DELETE /post/1
router.delete('/:id', async (req, res) => {
    try {
        const response = await Post.destroy({
            where: { id: req.params.id },
        })
        if (!response) {
            res.status(404).json({ message: 'No posts found!' });
            return;
        }
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;