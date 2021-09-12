import * as Yup from "yup";
import Store from "../models/Store";
import Product from "../models/Product";
import Order from "../models/Order";
import OrderProduct from "../models/OrderProduct";
import { Op } from "sequelize";

class OrderController {
  async createOrder(req, res) {
    const schema = Yup.object().shape({
      optionPickup: Yup.string(),
      shipping: Yup.number(),
      status: Yup.string().required(),
      store_id: Yup.number().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log("body", req.body);
      return res.status(401).json({ message: "Dados inválidos" });
    }

    const ordersProducts = req.body.products_ids;

    const { product_id, optionPickup, shipping, status, store_id, user_id } =
      req.body;

    const numberOrderRandom = Math.floor(Math.random() * 10000);

    const order = await Order.create({
      number_order: numberOrderRandom,
      product_id,
      option_pickup: optionPickup,
      shipping,
      order_total: 0,
      status,
      store_id,
      user_id,
    });

    const { number_order, id: orderId } = order;

    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);

    const duplicates = findDuplicates(ordersProducts);

    console.log(duplicates);

    if (duplicates.length) {
      return res
        .status(401)
        .json({ message: "somente é permitido um produto de cada tipo " });
    }

    const listProducts = ordersProducts.map((product) => {
      return { order_id: orderId, product_id: product };
    });

    await OrderProduct.bulkCreate(listProducts);

    const orderProductByOrder = await OrderProduct.findAll({
      where: {
        order_id: orderId,
      },
    });


    const allProducts = await Product.findAll({
      where: {
        [Op.or]: orderProductByOrder.map((oProduct) => {
          return { id: oProduct.product_id };
        }),
      },
    });

    console.log(allProducts)
    const total = allProducts.reduce((acumulator, currentProduct) => {
      console.log("value total", currentProduct.value);
      return acumulator + currentProduct.value;
    }, 0);

    const { order_total } = await order.update({ order_total: total });
    return res.status(201).json({ number_order, order_total });
  }

  async listByUser(req, res) {
    const userOrder = await Order.findAll({
      where: { user_id: req.body.userId },
    });

    const allOrderProducts = await OrderProduct.findAll();

    const filtered = userOrder.reduce((acumulator, uOrder) => {
      const allProducts = allOrderProducts.filter((oProduct) => {
        if (oProduct.order_id === uOrder.id) {
          return oProduct;
        }
      });
      if (allProducts.length > 0) {
        return [...acumulator, { order: uOrder, products: allProducts }];
      }
      return acumulator;
    }, []);

    return res.status(200).json(filtered);
  }

  async updateStatus(req, res) {
    const { id, status } = req.body;

    const order = await Order.findByPk(id);

    const currentOrder = await order.update({ status });

    return res.status(200).json(currentOrder);
  }
}

export default new OrderController();
