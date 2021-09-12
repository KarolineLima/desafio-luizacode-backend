import Sequelize, { Model } from 'sequelize';

class Image extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3080/files/${this.path}`
        }
      }
    }, {
      sequelize
    });

    return this;
  }
}

export default Image;