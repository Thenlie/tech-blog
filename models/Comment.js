const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }},
    {
        sequelize,
        modelName: 'comment',
        freezeTableName: true,
        underscored: true
});

module.exports = Comment;