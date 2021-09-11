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
    this.belongsTo( models.Categorica, { foreignKey: 'category_id', as: 'category'});
    this.belongsTo( models.Image, { foreignKey: 'image_id', as: 'image'});
  }
}

export default Product
