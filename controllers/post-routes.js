const router = require('express').Router();
const { Post } = require('../models');

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
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'user_id']
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

module.exports = router;