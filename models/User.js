const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6] }
    }}, 
    {
        hooks: {
            async beforeCreate(data) {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            },
            async beforeUpdate(data) {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            }
        },
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        underscored: true
});

module.exports = User;