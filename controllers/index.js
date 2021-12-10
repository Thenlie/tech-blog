const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./homepage-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');

router.use('/', homeRoutes);
router.use('/comment', commentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes)
router.use('/user', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;