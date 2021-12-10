const router = require('express').Router();
const { Post, User } = require('../models');

// GET /post/
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'user_id']
    }).then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /post/1
router.get('/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content', 'user_id', 'createdAt'],
        include: { model: User }
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No posts found with this ID!' });
            return;
        }
        // console.log(postData)
        // res.json(postData);
        const post = postData.get({ plain: true })
        res.render('single-post', { post })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /post/
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id //Update this to be the session ID
    }).then(postData => {
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: { id: req.params.id },
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No posts found!' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;