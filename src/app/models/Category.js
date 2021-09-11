import Sequelize, { Model } from 'sequelize'

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                id_category: {
                    primaryKey: true,
                    allowNull: false,
                    field: 'id_category',
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                },
                name_category: Sequelize.STRING,
            },
            {
                timestamps: false,
                sequelize,
            }
        )

        return this
    }
}

export default Category
