import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      cpf: Sequelize.STRING,
      birth_date: Sequelize.DATE,
      phone_number: Sequelize.INTEGER,
      address: Sequelize.STRING,
      id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    },
      {
        sequelize,
      });
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User