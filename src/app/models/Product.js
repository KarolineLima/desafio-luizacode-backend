import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      valueProduct: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
    }, 
    {  
      sequelize, 
    });
   
    return this;
  }

  static associate(models){
    this.belongsTo( models.User, { foreignKey: 'id_category', as: 'category'});
  }
}

export default Product