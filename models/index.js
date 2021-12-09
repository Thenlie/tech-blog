const sequelize = require('../config/connection');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//User has many Post
User.hasMany(Post, {
    foreignKey: 'id'
});
//Post belongs to User
Post.belongsTo(User, {
    foreignKey: 'user_id'
})
//Post has many Comment
//User has many Comment
//Comment belongs to User

module.exports = { Comment, Post, User };