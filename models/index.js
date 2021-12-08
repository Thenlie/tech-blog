const sequelize = require('../config/connection');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//User has many Post
//Post belongs to User
//Post has many Comment
//User has many Comment
//Comment belongs to User

module.exports = { Comment, Post, User };