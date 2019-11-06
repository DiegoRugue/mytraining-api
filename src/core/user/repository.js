import User from '../models/User';

class UserRepository {
  static async store(user) {
    const newUser = await User.create(user);

    return newUser;
  }

  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  static async findUserByToken(token) {
    const user = await User.findOne({ where: { token } });

    return user;
  }
}

export default UserRepository;
