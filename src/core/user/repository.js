import User from '../models/User';

class UserRepository {
  async store(user) {
    const { id } = await User.create(user);

    return id;
  }
}

export default new UserRepository();
