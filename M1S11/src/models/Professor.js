const { DataTypes } = require('sequelize');
const {connection} = require('../database/connection');

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING
    },
    area_atuacao: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

module.exports = Professor;