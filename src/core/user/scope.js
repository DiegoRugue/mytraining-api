const Yup = require('yup');

class UserScope {
  static async store(user) {
    const schema = Yup.object().shape({
      firstName: Yup.string().required().max(32),
      lastName: Yup.string().required().max(32),
      email: Yup.string().required().email().max(100),
      token: Yup.string().max(255),
      password: Yup.string().min(8)
        .when('token', (token, field) => (token ? field : field.required())),
    });

    await schema.validate(user).catch((err) => {
      throw { code: 400, message: err.errors };
    });
  }
}

module.exports = UserScope;
