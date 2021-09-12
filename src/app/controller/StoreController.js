import * as Yup from 'yup';
import Store from '../models/Store';

class StoreController {
    async find(req, res) {
        try {
            const stores = await Store.findAll({
                attributes: ['id', 'name', 'address'],
            });

            return res.status(200).json(stores);
        } catch {
            return res
                .status(401)
                .json({ message: 'Não foi encontrada nenhuma loja' });
        }
    }

    async createStore(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                address: Yup.string().required(),
            });
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            // const storeExists = await Store.findOne({
            //     where: {
            //         name: req.body.name,
            //     },
            // });

            // if (storeExists) {
            //     return res.status(401).json({ message: 'Loja já cadastrada' });
            // }

            const { id, name, address } = await Store.create(req.body);
            return res.json({ id, name, address });
        } catch (err) {
            console.log(err);
            return res
                .status(401)
                .json({ message: 'Não foi possível criar essa loja' });
        }
    }
}

export default new StoreController();
