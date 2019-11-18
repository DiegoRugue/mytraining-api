const Sequelize = require('sequelize');
const { hash, compare } = require('bcryptjs');

class User extends Sequelize.Model {
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
      user.pathAvatar = `${process.env.URL_UPLOADS}/${user.pathAvatar}`;

      return this;
    });

    this.addHook('afterFind', user => {
      if (user) {
        user.displayName = `${user.firstName} ${user.lastName}`;
        user.pathAvatar = `${process.env.URL_UPLOADS}/${user.pathAvatar}`;
      }

      return this;
    });
  }

  checkPassword(password) {
    return compare(password, this.passwordHash);
  }
}

module.exports = User;
