const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Explorer = connection.define('explorers', {
    name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.DATE
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      profile: {
        type: DataTypes.ENUM(['Turista', 'Morador', 'Guia'])
      }
})

module.exports = Explorer

