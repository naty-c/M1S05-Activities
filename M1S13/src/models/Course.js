const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Course = connection.define('courses', {
    name: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.INTEGER
    }
});

module.exports = Course;

