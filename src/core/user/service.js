import axios from 'axios';
import UserRepository from './repository';

class UserService {
  async store(user) {
    user.pathAvatar = await this.uploadFile(user.file);
    const id = await UserRepository.store(user);

    return {
      user: {
        id,
      },
    };
  }

  async uploadFile(file) {
    const config = {
      url: 'http://localhost:3340/file',
      method: 'POST',
      data: { file },
    };
    const { data } = await axios(config);
    if (data) return data;

    throw { code: 401, message: 'Fail upload image' };
  }
}

export default new UserService();
