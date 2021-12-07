const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Comment extends Model {};

Comment.init({},{sequelize});

module.exports = Comment;