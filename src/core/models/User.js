import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        displayName: Sequelize.VIRTUAL,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
        pathAvatar: Sequelize.STRING,
        token: Sequelize.STRING,
      },
      {
        sequelize,
        underscored: true,
      },
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.passwordHash = await hash(user.password, 8);
      }
      user.displayName = `${user.firstName} ${user.lastName}`;

      return this;
    });

    this.addHook('afterSave', user => {
      user.pathAvatar = `http://localhost:3340/${user.pathAvatar}`;

      return this;
    });

    this.addHook('afterFind', user => {
      if (user) {
        user.displayName = `${user.firstName} ${user.lastName}`;
        user.pathAvatar = `http://localhost:3340/${user.pathAvatar}`;
      }

      return this;
    });
  }

  checkPassword(password) {
    return compare(password, this.passwordHash);
  }
}

export default User;
