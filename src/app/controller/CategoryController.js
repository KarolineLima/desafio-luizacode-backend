import Category from '../models/Category'

class CategoryController{
    
  async find(req, res){
    const categories = await Category.findAll({
        attributes: ['id', 'name']
    });

    return res.status(200).json(categories);
  };

  async getId(req, res){
    const category = await Category.findOne({
        attributes: ['id', 'name'],
        where: {
            name: req.body.categoryName
        }
    });

    return res.status(200).json(category);
  };
}

export default new CategoryController();