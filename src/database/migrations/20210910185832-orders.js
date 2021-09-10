'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id_order:{
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
          key: 'id_product'
        }
      },
      optionPickup:{
        type: Sequelize.STRING,
        allowNull: false,
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
      store:{
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id_store'
        },
        onDelete: 'SET NULL',
        allowNull: false,
      },
      user:{
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id_user'
        },
        onDelete: 'SET NULL',
        allowNull: false,
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
    return queryInterface.dropTable('orders');
  }

};