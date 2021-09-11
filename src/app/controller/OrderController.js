import * as Yup from 'yup';
import Store from '../models/Store';
import Product from '../models/Product';


class OrderController {

    async createOrder(req, res) {

        const schema = Yup.object().shape({
            numberOrder: Yup.number(),
            id_product: Yup.number().required(),
            optionPickup: Yup.string(),
            shipping: Yup.number(),
            orderTotal: Yup.number().required(),
            status: Yup.string().required(),
            id_store: Yup.number().required(),
            id_user: Yup.number().required()

        });

       
        if(!(await schema.isValid(req.body))){
            return res.status(401).json({ message: 'Opa, dados inválidos'})

        }
        const orders = ["123", "568"];
     
        async function products(item) {
            if (item > 0) {
                const colunaTabelaUsario =+ item
                console.log("codigo", colunaTabelaUsario);

                function randomNumber() {
                    const numberOrder = Math.floor(Math.random() * 65536789);
                    return numberOrder
                }

                const product = await Product.findOne({
                    where: { id_product: id_product, id_product: true }
                });

                const store = await Store.findOne({
                    where: { id_product: id_product, id_product: true, $and:{id_store: id_store, id_store: true} }
                });

                console.log(product, store)

                if(store){
                    if (product) {
                        if (product.quantity >= 1) {
                            const { randomNumber, id_product, optionPickup, shipping, orderTotal, status, id_store, id_user } = await orders.create(req.body);
                            Product.update(
                                { quantity: product.quantity - 1 },
                            ).then((updatedRows) => {
                                res.json(updatedRows);
                            })
                            return res.json({ message: "é possível comprar produto" })
    
    
                        } else {
                            return res.json({ message: "produto esgotado" })
                        }
    
                    }else{
                        return res.json({ message: "Produto inexistente" })
                    }

                }else{
                    return res.json({ message: "Loja inexistente ou produto inexistente" })
                }
               
            }
            return 0
        }

        orders.forEach(products);

    }

}

export default new OrderController();