import Store from '../models/Store'

class StoreController{
  async find(req, res){
      const stores = await Store.findAll({
          attributes: ['id', 'name', 'address']
      });
      return res.status(200).json(stores);
  };
}

export default new StoreController();