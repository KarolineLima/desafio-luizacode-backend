import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Store extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Store;
