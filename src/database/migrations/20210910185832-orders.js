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
      number_order:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_pickup:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipping:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_total:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id'
        },
        onDelete: 'SET NULL',
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
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