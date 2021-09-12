import * as Yup from "yup";
import Product from "../models/Product";
import Image from "../models/Image";
import ImageController from "./ImageController";

class ProductController {
  // constructor() {
  //   this.createProduct = this.createProduct.bind(this);
  // }

  async createProduct(req, res) {
    // const { url} = await ImageController.create({
    //   image: {
    //     originalname: req.body.imageName,
    //     imagename: req.body.path,
    //   }
    // });
    
    // console.log(url);

    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   valueProduct: Yup.number().required(),
    //   quantity: Yup.number().required(),
    // });
    
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(401).json({ message: "Dados inválidos" });
    // }

    // const productExists = await Product.findOne({
    //   where: {
    //     name: req.body.name,
    //   },
    // });

    // if (productExists) {
    //   return res.status(401).json({ message: "Produto já está cadastrado" });
    // }
    
    const { id, name } = await Product.create({
      name: req.body.name,
      value: req.body.value,
      quantity: req.body.quantity,
      category_id: req.body.category_id,
    });
    
    return res.status(201).json({ id, name });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.integer().required(),
      quantity: Yup.integer().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: "Dados inválidos",
      });
    }

    const product = await Product.findByPk(req.id);

    if (!product) {
      return res.status(401).json({ message: "Produto inexistente" });
    }

    const { id, name, valueProduct, quantity } = await product.delete(req.body);
    return res.status(200).json({ message: "Exclusão realizada com sucesso" });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      valueProduct: Yup.integer().required(),
      quantity: Yup.integer().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: "Dados inválidos",
      });
    }

    const product = await Product.findByPk(req.id);
    const findImage = await Image.findById(findProduct.image_id);

    if (!product) {
      return res.status(401).json({ message: "Produto inexistente" });
    }

    if (!findImage) {
      return res.status(401).json({ message: "Imagem não encontrada" });
    }

    const { id, name, valueProduct, quantity } = await product.update(req.body);
    return res
      .status(200)
      .json({ id, name, valueProduct, quantity, image_url: findImage.url });
  }

  async listAll() {
    const produtcs = await Product.findAll();

    const producstDisponiveis = produtcs.filter((item) => item.quantity > 1);

    return json(producstDisponiveis);
  }

  async getById(req, res) {
    const findProduct = await Product.findById(req.id);
    const findImage = await Image.findById(findProduct.image_id);

    if (!findProduct) {
      return res.status(401).json({ message: "Produto não encontrado" });
    }

    if (!findImage) {
      return res.status(401).json({ message: "Imagem não encontrada" });
    }

    return res.json({
      id,
      name,
      valueProduct,
      quantity,
      image_url: findImage.url,
    });
  }

  async validyQuantity(req, res) {
    if (req.quantity > 1) {
      return res
        .status(401)
        .json({ message: "Quantidade superior a permitida" });
    }

    return;
  }

  async checkDisponibilityProduct(req, res) {
    const product = await Product.findByPk(req.id);

    if (product.quantity < 1) {
      return res.status(401).json({ message: "Produto indisponível" });
    }

    return res.status(200).json({ message: "Produto disponível" });
  }

  async updateStock(req, res) {
    const product = await Product.findByPk(req.id);

    if (!product) {
      return res.status(401).json({ message: "Produto não encontrado" });
    }

    req.quantity--;

    const { id, quantity } = await product.update(req.body);

    return res
      .status(200)
      .json({ message: "Quantidade do produto foi atualizada" });
  }
}

export default new ProductController();
