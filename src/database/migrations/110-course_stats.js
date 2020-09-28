'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('course_stats', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      course_id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      student_amount: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED
      },
      duration_amount: {
        type: Sequelize.DataTypes.INTEGER(20).UNSIGNED
      },
      difficulty_amount:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED
      },
      job_exit_amount:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED
      },
      study_hours_amount:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('course_stats')
  }
};