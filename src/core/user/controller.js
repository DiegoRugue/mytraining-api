const UserService = require('./service');

class UserController {
  static async store(req, res) {
    const result = await UserService.store(req.body);

    res.ok(result);
  }
}

module.exports = UserController;
