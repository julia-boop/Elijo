'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('user_courses', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      course_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_courses')
  }
};