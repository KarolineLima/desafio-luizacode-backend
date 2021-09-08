import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Store extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      address: Sequelize.STRING,
    }, 
    {  
      sequelize, 
    });
    this.addHook('beforeSave', async store => {
      if(store.password){
        store.password_hash = await bcrypt.hash(store.password, 10)
      }
    })
    return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash)
  }
}

export default Store