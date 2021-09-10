'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id_product:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_product:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      valueProduct:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_category:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'categories',
          key: 'id_category'
        }
      },
      id_image: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'images', 
          key: 'id_image'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
   },
  
   down: queryInterface => {
    return queryInterface.dropTable('products');
  }
};