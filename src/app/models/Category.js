import Sequelize, { Model } from 'sequelize';

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                timestamps: false,
                sequelize,
            }
        );

        return this;
    }
}

export default Category;
