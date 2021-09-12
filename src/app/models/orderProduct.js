import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
    static init(sequelize) {
        super.init(
            {
                order_id:Sequelize.INTEGER,
                product_id:Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
        this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    }
}