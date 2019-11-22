const axios = require('axios');
const UserScope = require('./scope');
const UserRepository = require('./repository');
const SessionService = require('../session/service');

class UserService {
  static async store(user) {
    await UserScope.store(user);
    await this.checkUserEmail(user.email);

    if (user.avatar) {
      user.pathAvatar = await this.uploadFile(user.avatar);
    }

    const newUser = await UserRepository.store(user);

    return SessionService.generateToken(newUser);
  }

  static async uploadFile(file) {
    const config = {
      url: `${process.env.URL_UPLOADS}/file`,
      method: 'POST',
      data: { file },
    };
    const { data } = await axios(config);
    return data;
  }

  static async checkUserEmail(email) {
    const userExists = await UserRepository.findUserByEmail(email);

    if (userExists) throw { code: 401, message: 'E-mail already registered' };

    return true;
  }
}

module.exports = UserService;
