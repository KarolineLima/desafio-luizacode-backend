import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR';
import User from '../models/User';
import Store from '../models/Store';
import Product from '../models/Product';
import Order from '../models/Order';

/*
numberOrder = número do pedido
optionPickup = opção de retirada
shipping = opção de envio (frete)
orderTotal = total de pedidos

/path1/path2
id_product/id_user
- pedido
- usuario
- venddor

*/
class OrderController{
  
    async createOrder(req, res){
        const product= ["123", "568"];

        function products(item){
            if(item>0){
            const colunaTabelaUsario =+ item
            console.log("codigo", colunaTabelaUsario);
            const schema = Yup.object().shape({
                numberOrder: Yup.number(),
                id_product: Yup.number().required(),
                optionPickup: Yup.string(),
                shipping: Yup.number(),
                orderTotal: Yup.number().required(),
                status:Yup.string().required(),
                id_store: Yup.number().required(),
                id_user: Yup.number().required()     
        
            });
    
            if(!(await schema.isValid(req.body))){
                return res.status(401).json({ message: 'Opa, dados inválidos'})
    
            }

            function randomNumber(){
                const numberOrder = Math.floor(Math.random() * 65536789);
                return numberOrder
            }
            

            const {randomNumber, id_product, optionPickup, shipping, orderTotal,status, id_store, id_user } = await User.create(req.body);
            return res.json({randomNumber, id_product, optionPickup, shipping, orderTotal,status, id_store, id_user });
            
            // const newRequest = await OrderController.findById(req.params.id_user, req.params.id_product);
            }
            return 0
        }
            
        product.forEach(products);
            
    }

}

export default new OrderController();