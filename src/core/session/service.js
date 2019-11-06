import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import UserRepository from '../user/repository';

class SessionService {
  static async store(email, password, token) {
    const user = token
      ? await this.validateUserToken(token)
      : await this.validateUserEmail(email, password);

    return this.generateToken(user);
  }

  static async validateUserEmail(email, password) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user || (user && !await user.checkPassword(password))) {
      throw { code: 404, message: 'Email or password not match' };
    }

    return user;
  }

  static async validateUserToken(token) {
    const user = await UserRepository.findUserByToken(token);

    if (!user) {
      throw { code: 404, message: 'Token not found' };
    }

    return user;
  }

  static generateToken(user) {
    const { id, displayName, email, pathAvatar } = user;

    return {
      user: {
        displayName,
        email,
        pathAvatar,
      },
      token: jwt.sign({ id }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    };
  }
}

export default SessionService;
