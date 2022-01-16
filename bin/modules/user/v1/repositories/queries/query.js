const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const findUser = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM users WHERE username = "${param.username}" Limit 1`;
  const result = await db.query(query);
  return result;
};

const loginUser = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM users WHERE username = "${param.username}" Limit 1`;
  const result = await db.query(query);
  return result;
};

const listUser = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT * FROM users ';
  const result = await db.query(query);
  return result;
};

module.exports = {
  findUser,
  loginUser,
  listUser
};
