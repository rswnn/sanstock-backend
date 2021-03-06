const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneUser = async (param) => {
  const { username, password, role } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO users (id, username, password, role) 
  VALUES (NULL, '${username}', '${password}', '${role}')`;
  const result = await db.query(query, [param]);
  return result;
};

const updateUser = async (param) => {
  const { id, username, password, role } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  let query;
  if (password) {
    query = `UPDATE users 
    SET username = '${username}', password = '${password}', role = '${role}'
    WHERE users.id = ${id}`;
  } else {
    query = `UPDATE users 
    SET username = '${username}', role = '${role}'
    WHERE users.id = ${id}`;
  }
  const result = await db.query(query, [param]);
  return result;
};

const deleteUser = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM users WHERE users.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOneUser,
  updateUser,
  deleteUser
};
