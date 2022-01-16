const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const findUser = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM users WHERE username = "${param.username}" Limit 1`;
  const result = await db.query(query);
  return result;
};

const getUsers = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT id, username, role FROM users`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  findUser,
  getUsers
};
