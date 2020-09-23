'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('user_studies', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      career_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'careers',
          key: 'id'
        }
      },
      course_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_studies')
  }
};