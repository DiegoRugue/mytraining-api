import SessionService from './service';

class SessionController {
  static async store(req, res) {
    const { email, password, token } = req.body;

    const result = await SessionService.store(email, password, token);

    res.ok(result);
  }
}

export default SessionController;
