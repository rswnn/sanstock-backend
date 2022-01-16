const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneUser = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const { username, password, role } = param;
  const query = `INSERT INTO users (id, username, password, role) 
  VALUES (NULL, '${username}', '${password}', '${role}')`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOneUser
};
