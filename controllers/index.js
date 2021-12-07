const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const userRoutes = require('./user-routes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;