const express = require ('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');
const helpers = require('./utils/helpers');
const path = require('path');

const PORT = process.env.PORT || 3001
const app = express();

// Create sequelize session
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'somerandomstringoftext',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
}
app.use(session(sess))

// Set server engine to handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers'));

// Start server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});