import * as Yup from 'yup';
import Store from '../models/Store'

class StoreController{
  async find(req, res){
    try{
      const stores = await Store.findAll({
          attributes: ['id_store', 'name_store', 'address']
      });
      
      return res.status(200).json(stores);
    }
      catch{
      return res.status(401).json({message:'Não foi encontrada nenhuma loja'});
  }};

  async createStore(req,res){
    try {
      const schema = Yup.object().shape({
        name_store: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        address: Yup.string().required(),
      });  

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({message: 'Dados inválidos'})
      }
      console.log(req.body)
      const storeExists = await Store.findOne({
        where: { 
          email: req.body.email 
         }
       });

       
 
     if(storeExists){
       return res.status(401).json({message: 'Loja já cadastrada'})
     };
 
     const {id_store, name_store, email, address} = await Store.create(req.body);
     return res.json({id_store, name_store, email, address});
    }

    catch (err) {
      console.log(err)
      return res.status(401).json({message:'Não foi possível criar essa loja'});
    }
  }

}

export default new StoreController();