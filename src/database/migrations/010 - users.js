'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false
      },
      name:{
        type: Sequelize.DataTypes.STRING(100)
      },
<<<<<<< HEAD
=======
      last_name:{
        type: Sequelize.DataTypes.STRING(100)
      },
>>>>>>> b22820ab5759ef1c0e044921db8f7b0fc4c52321
      age: {
        type: Sequelize.DataTypes.DATE
      },
      telephone: {
        type: Sequelize.DataTypes.STRING(100)
      },
<<<<<<< HEAD
=======
      adress:{
        type: Sequelize.DataTypes.STRING(100)
      },
      location: {
        type: Sequelize.DataTypes.STRING(100)
      },
>>>>>>> b22820ab5759ef1c0e044921db8f7b0fc4c52321
      experiences: {
        type: Sequelize.DataTypes.STRING(255)
      },
      province: {
        type: Sequelize.DataTypes.STRING(100)
      },
      genre_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id'
        }
      },
      photo:{
        type: Sequelize.DataTypes.STRING(100)
      },
      rol:{
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false
      },
      user_confirm:{
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};