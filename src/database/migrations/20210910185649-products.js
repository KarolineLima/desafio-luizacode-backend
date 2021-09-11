'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
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
      valueProduct:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'categories',
          key: 'id'
        }
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'images', 
          key: 'id'
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