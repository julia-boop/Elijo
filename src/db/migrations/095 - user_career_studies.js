'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('user_career_studies', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      career_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'careers',
          key: 'id'
        }
      },
      user_studies_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'user_studies',
          key: 'id'
        }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_career_studies')
  }
};