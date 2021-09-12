import Image from '../models/Image';
import Product from '../models/Product';

class ImageController{
  async create(req, res){
    const { originalname: name, imagename: path } = req.image;

    const { id, url } = await Image.create({ name, path });

    return res.status(201).json({
      id, image, profile: { url }
    });
  }

  async delete(req, res){ 
    const image = await Image.findByPk(req.id);

    if(!image){
        return res.status(401).json({ message: 'Imagem inexistente'});
    }

    const { id, url } = await Image.delete(req.body);

    return res.status(200).json({ message: 'Exclusão realizada com sucesso'});
  };

  async update(req, res){
        
    const image = await Image.findByPk(req.id);

    if(!image){ 
        return res.status(401).json({ message: 'Imagem inexistente'});
    }

    return res.status(201).json({
      id, image, profile: { url }
    });    
  };

  async listAll(){ 
        
    const images = await Image.findAll();

    return json(images);
  };

  async listById(req, res){
    const findImage = await Product.findById(req.id);

    if(!findImage){
        return res.status(401).json({ message: 'Imagem não encontrada' });
    }
    
    return res.status(201).json({
      id, image, profile: { url }
    }); ;
    
  };


}

export default new ImageController();