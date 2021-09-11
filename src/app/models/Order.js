import Sequelize, { Model } from 'sequelize';


class Order extends Model {
  static init(sequelize) {
    super.init({
      numberOrder: Sequelize.STRING,
      optionPickup: Sequelize.STRING,
      product: Sequelize.INTEGER,
      shipping: Sequelize.INTEGER,
      orderTotal: Sequelize.INTEGER,
      status: Sequelize.STRING,
      store: Sequelize.INTEGER,
      user: Sequelize.INTEGER,
    },{  
      sequelize, 
    });

    return this;
    }
    static associate(models){
        this.belongsTo( models.Product, { foreignKey: 'id', as: 'products'});
        this.belongsTo( models.Store, { foreignKey: 'id_store', as: 'stores'});
        this.belongsTo( models.User, { foreignKey: 'id_user', as: 'users'});
      }
    }

export default Order;