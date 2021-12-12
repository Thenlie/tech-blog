const router = require('express').Router();
const withAuth = require('../utils/auth');
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
        res.status(500);
    };
});

// GET /post/create
router.get('/create', withAuth, (req, res) => {
    res.render('create-post', { loggedIn: true }); 
});

// GET /post/update/1
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const response = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
            include: { model: User, attributes: ['username'] },
        });
        if (!response) {
            res.status(404).json;
            return;
        }
        const post = response.get({ plain: true });
        res.render('update-post', { post, loggedIn: true }); 
    }
    catch (err) {
        res.status(500);
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
            res.status(404).json;
            return;
        }
        const post = response.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn, home: true});
    }
    catch (err) {
        res.status(500);
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
        res.status(500);
    };
});

// PUT /post/1
router.put('/:id', async (req, res) => {
    try {
        const response = await Post.update(
            { title: req.body.title, content: req.body.content },
            { where: { id: req.params.id }}
        );
        if (!response) {
            res.status(404);
            return;
        }
        res.json(response)
    }
    catch (err) {
        res.status(500);
    }
});

// DELETE /post/1
router.delete('/', async (req, res) => {
    try {
        const response = await Post.destroy({
            where: { id: req.body.id },
        })
        if (!response) {
            res.status(404);
            return;
        }
        res.json(response);
    }
    catch (err) {
        res.status(500);
    };
});

module.exports = router;