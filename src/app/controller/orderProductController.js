import * as Yup from 'yup';

class orderProductController{
    async createOrderProduct(orderProduct) {
        const schema = Yup.object().shape({
            order_id: Yup.number().required(),
            product_id: Yup.number().required(),
        })

        const { order_id, product_id } = orderProduct;

        const { id } = await orderProduct.create(orderProduct);

        return id;
    }

   async listByOrder(order_id){
    return order.findAll({
                where: { order_id }
    });
   }

}