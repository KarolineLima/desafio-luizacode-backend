import * as Yup from 'yup';
import Employee from '../models/Employee';

class EmployeeController {
  async registration(req, res) {
    const schema = Yup.object().shape({
      store_id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Dados inválidos' });
    }

    const employeeExists = await Employee.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (employeeExists) {
      return res
        .status(401)
        .json({ message: 'Funcionário já cadastrado na loja' });
    }

    const { id, name, email } = await Employee.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const employee = await Employee.findOne({
      where: { email: email },
    });
    if (employee && (await employee.checkPassword(password))) {
      return res.status(200).json({
        name: employee.name,
        id: employee.id,
        store_id: employee.store_id,
      });
    }
    return res.status(401).json({ message: 'Email ou senha inválida' });
  }
  async delete(req, res) {
    return res.status(200).json({ message: 'Isso aí psiti!' });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required().min(6) : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .min(6)
              .oneOf([Yup.ref('password')])
          : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: 'Falha na validação',
      });
    }

    const { email, oldPassword } = req.body;
    const employee = await Employee.findByPk(req.params.id);

    if (email !== employee.email) {
      const employeeExists = await Employee.findOne({ where: { email } });

      if (employeeExists) {
        return res.status(400).json({ message: 'Verifique o email informado' });
      }
      return res.status(400).json({ message: 'Email não confere' });
    }

    if (oldPassword && !(await employee.checkPassword(oldPassword))) {
      return res.status(400).json({ message: 'Senha não confere' });
    }

    const { id, name } = await employee.update(req.body);

    return res.status(200).json({
      id,
      name,
    });
  }
}

export default new EmployeeController();
