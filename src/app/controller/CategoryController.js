import Category from '../models/Category'

class CategoryController{
    
  async find(req, res){
    try{
    const categories = await Category.findAll({
        attributes: ['id', 'name_category']
    });

    return res.status(200).json(categories);
  }
  catch{
    return res.status(400).json({message:'Não foi possível retornar as categorias'})
  }
  };

  async getId(req, res){
    const category = await Category.findOne({
        attributes: ['id', 'name_category'],
        where: {
            name: req.params.id
        }
    });

    return res.status(200).json(category);
  };
  async createCategory(req,res){
    try {
      
      const {name} = req.body
      console.log(name)
      const category = await Category.create(
       {name_category:name}
      )
      console.log(category)
      
      
      return res.status(200).json(category);
    }
    catch (err) {
      console.log(err)
      return res.status(401).json({message:'Não foi possível criar essa categoria'});
    }
  }
}

export default new CategoryController();