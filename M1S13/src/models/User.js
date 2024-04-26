const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const User = connection.define('users', {
    name: {
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATE,
    },
    phone: {
        type: DataTypes.STRING,
    },
    profile: {
        type: DataTypes.ENUM('student', 'teacher'),
    }, 
},   {});

module.exports = User;
