const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Area = connection.define('areas', {
    name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      contact: {
        type: DataTypes.STRING
      },
      opening_hours: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.STRING
      }
})

module.exports = Area

