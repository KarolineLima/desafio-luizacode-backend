import * as Yup from 'yup';
import Store from '../models/Store';
import Product from '../models/Product';
import Order from '../models/Order';

class OrderController {
    async createOrder(req, res) {
        const schema = Yup.object().shape({
            product_id: Yup.number().required(),
            optionPickup: Yup.string(),
            shipping: Yup.number(),
            orderTotal: Yup.number().required(),
            status: Yup.string().required(),
            store_id: Yup.number().required(),
            user_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            console.log('body', req.body);
            return res.status(401).json({ message: 'Dados inválidos' });
        }
 
        const ordersProducts = req.body.products_ids;

        ordersProducts.map(async (product) => await OrderProduct.create({order_id: order.order_id, product_id: product}));

        const{ product_id, optionPickup, shipping,
             orderTotal, status ,store_id, user_id} = req.body;

        const numberOrderRandom = Math.floor(Math.random() * 10000);

        const {numberOrder} = Order.create({ numberOrder:numberOrderRandom, product_id, optionPickup, shipping,
                orderTotal, status ,store_id, user_id })

        return res.status(201).json({numberOrder});
    }

    async listByUser(user_id) {
        const userOrder = await Order.findAll({
            where: { user_id }
        })

        userOrder.reduce((acumulator) => {
            const orderProducts = await orderProduct.findAll({
                where: { order_id }
            })
            orderProducts.map(() => {
                const product = Product.findOne({
                    where: { order_id }
                });
                acumulator = [...acumulator, product]
            });
            return acumulator ;
          }, []);

        const orderProducts = await orderProduct.findAll({
            where: { order_id }
        });

        return orderProducts;

    }


    async updateStatus(req, res){
        const { id, status } = req.body
  
        const order = Order.findByPk(id)

        const currentOrder = order.update({ status })

        return res.status(200).json( currentOrder );
    }
}

export default new OrderController();
