const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET /comment
router.get('/', async (req, res) => {
    try {
        const response = await Comment.findAll({
            attributes: ['id', 'content', 'post_id', 'user_id', 'createdAt'],
            include: { model: User,  attributes: ['username'] }
        });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET /comment/:id
router.get('/:id', async (req, res) => {
    try {
        const response = await Comment.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'content', 'post_id', 'user_id', 'createdAt'],
            include: { model: User, attributes: ['username'] }
        });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// POST /comment
router.post('/', async (req, res) => {
    try {
        const response = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;