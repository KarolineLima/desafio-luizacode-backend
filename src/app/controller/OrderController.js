import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR';
import User from '../models/User';
import Store from '../models/Store';
import Product from '../models/Product';
import Order from '../models/Order';
import { response } from 'express';

class OrderController{
  
    async createOrder(req, res){
        const orders= ["123", "568"];

        function products(item){
            if(item>0){
            const colunaTabelaUsario =+ item
            // console.log("codigo", colunaTabelaUsario);
            
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
            

            const product = await Product.findOne({ 
                where: { id_product: id_product, id_product: true }
            });

            if(product){
                if(product.quantity >= 1){
                    const {randomNumber, id_product, optionPickup, shipping, orderTotal,status, id_store, id_user } = await orders.create(req.body);
                    Product.update(
                        {quantity: product.quantity - 1},
                    ).then((updatedRows) =>{
                        res.json(updatedRows);
                    })
                    return res.json({ message: "é possível comprar produto"})


                }else{
                    return res.json({ message: "produto esgotado"})
                }
                
            }
      

            

            
            
        
            }
            return 0
        }
            
        orders.forEach(products);
            
    }

}

export default new OrderController();