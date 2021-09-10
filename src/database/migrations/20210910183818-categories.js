'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id_category:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_category:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
   },
  
   down: queryInterface => {
    return queryInterface.dropTable('categories');
  }
};