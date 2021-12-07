const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Post extends Model {};

Post.init({},{sequelize});

module.exports = Post;