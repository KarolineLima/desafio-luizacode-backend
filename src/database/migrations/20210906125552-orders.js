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
     /* product:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'products',
          key: 'id'
        }
      },*/
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
     /* store:{
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id'
        },
        onDelete: 'SET NULL',
        allowNull: false,
      },
      user:{
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          hey:'id'
        },
        onDelete: 'SET NULL',
        allowNull: false,
      },*/
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

