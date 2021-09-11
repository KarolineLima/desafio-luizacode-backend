import * as Yup from 'yup';
import Store from '../models/Store';
import Product from '../models/Product';
import Order from '../models/Order';

class OrderController {
    async createOrder(req, res) {
        function randomNumber() {
            const numberOrder = Math.floor(Math.random() * 65536789);
            return numberOrder;
        }

        const schema = Yup.object().shape({
            numberOrder: Yup.number(),
            product_id: Yup.number().required(),
            optionPickup: Yup.string(),
            shipping: Yup.number(),
            orderTotal: Yup.number().required(),
            status: Yup.string().required(),
            store_id: Yup.number().required(),
            user_id: Yup.number().required(),
        });

        const { product_id, store_id, user_id } = req.body;

        if (!(await schema.isValid(req.body))) {
            console.log('body', req.body);
            return res.status(401).json({ message: 'Opa, dados inválidos' });
        }
        const orders = [];

        async function products(item) {
            if (item > 0) {
                const colunaTabelaUsario = +item;

                const product = await Product.findOne({
                    where: { id: product_id },
                });
                const store = await Store.findOne({
                    where: {
                        id: store_id,
                    },
                });

                console.log(product, store);

                if (store) {
                    if (product) {
                        if (product.quantity >= 1) {
                            const {
                                randomNumber,
                                id_product,
                                optionPickup,
                                shipping,
                                orderTotal,
                                status,
                                id_store,
                                id_user,
                            } = await Order.create(req.body);
                            Product.update({
                                quantity: product.quantity - 1,
                            }).then((updatedRows) => {
                                res.json(updatedRows);
                            });
                            return res.json({
                                message: 'é possível comprar produto',
                            });
                        } else {
                            return res.json({ message: 'produto esgotado' });
                        }
                    } else {
                        return res.json({ message: 'Produto inexistente' });
                    }
                } else {
                    return res.json({
                        message: 'Loja inexistente ou produto inexistente',
                    });
                }
            }
            return 0;
        }

        orders.forEach(products);
    }

    async removeProduct(req, res) {
        const orders = [];
        const index = product.indexOf(req.body);
        const option = orders.splice(index, 1);

        return res.status(200).json({
            message: `Produto removido: ${option}. Lista de produtos atualizada: ${orders}`,
        });
    }

    async addProduct(req, res) {
        const orders = [];
        const add_product = orders.push(req.body);

        return res.status(200).json({
            message: `Produto adicionado ${add_product}. Lista de produtos atualizada: ${orders}`,
        });
    }
}

export default new OrderController();
