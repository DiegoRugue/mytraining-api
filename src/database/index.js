const Sequelize = require('sequelize');
const config = require('../config/database');

const User = require('../core/models/User');

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();
