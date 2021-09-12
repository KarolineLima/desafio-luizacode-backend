import Sequelize from 'sequelize';
import Order from '../app/models/Order';
import Product from '../app/models/Product';
import User from '../app/models/User';
import Store from '../app/models/Store';
import databaseConfig from '../config/database';
import Category from '../app/models/Category';
import Image from '../app/models/Image';
import OrderProduct from '../app/models/OrderProduct';

//

const models = [Store, Order, Product, User, Category, Image, OrderProduct];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
