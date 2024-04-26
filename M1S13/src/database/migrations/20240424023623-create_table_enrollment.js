'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('enrollments', {
      id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
      },
      user_id: {
       allowNull: false,
       type: Sequelize.INTEGER,
       references: {
         model: 'users',
         key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
     },
      course_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     },
      createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
      updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     }
     });

  // Restrição condicional que só permite inserir alunos
    await queryInterface.addConstraint('enrollments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_enrollments_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      where: {
        profile: 'student'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('enrollments');
  }
};
