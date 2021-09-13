import Category from '../models/Category';

class CategoryController {
    async find(req, res) {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name'],
            });

            return res.status(200).json(categories);
        } catch {
            return res
                .status(400)
                .json({ message: 'Não foi possível retornar as categorias' });
        }
    }

    async getId(req, res) {
        try {
            const category = await Category.findOne({
                attributes: ['id', 'name'],
                where: {
                    id: req.params.id,
                },
            });
            return res.status(200).json(category);
        } catch {
            return res
                .status(400)
                .json({ message: 'Erro ao tentar procurar categoria' });
        }
    }
    async createCategory(req, res) {
        console.log('testing')
        try {
            const { name } = req.body;

            const category = await Category.create({ name: name });

            return res.status(200).json(category);
        } catch (err) {
            console.log(err);
            return res
                .status(401)
                .json({ message: 'Não foi possível criar essa categoria' });
        }
    }
}

export default new CategoryController();
