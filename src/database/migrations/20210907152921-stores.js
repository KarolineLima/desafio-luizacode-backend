'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    }); 
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stores');
  }
};
