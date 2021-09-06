'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      numberOrder:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      product:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'products',
          key: 'id'
        }
      },
      shipping:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderTotal:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller:{
        references: {
          model: 'sellers',
          key: 'id'
        }
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
  
   down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};

