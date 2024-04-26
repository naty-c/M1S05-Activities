const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Enrollment = connection.define('enrollments', {
    user_id: {
        type: DataTypes.INTEGER,
    },
    course_id: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Enrollment;
