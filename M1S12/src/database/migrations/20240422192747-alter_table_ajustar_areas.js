'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('areas', 'opening_hours', {
      type: Sequelize.STRING,
      allowNull: true 
    });

    await queryInterface.changeColumn('areas', 'price', {
      type: Sequelize.STRING,
      allowNull: true 
    });

    await queryInterface.changeColumn('areas', 'website', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('areas', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('areas', 'opening_hours', {
      type: Sequelize.TIME,
    });

    await queryInterface.changeColumn('areas', 'price', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.changeColumn('areas', 'website', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.removeColumn('areas', 'country');
  }
};
