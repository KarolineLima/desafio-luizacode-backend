import Sequelize, { Model } from 'sequelize';

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                number_order: Sequelize.STRING,
                option_pickup: Sequelize.STRING,
                shipping: Sequelize.INTEGER,
                order_total: Sequelize.INTEGER,
                status: Sequelize.STRING,
                store_id: Sequelize.INTEGER,
                user_id: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }
    static associate(models) {
        this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'stores' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    }
}

export default Order;
