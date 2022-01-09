const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const getMaxCode = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT max(kode) as kodeTerbesar FROM suppliers';
  const result = await db.query(query);
  return result;
};

const listSupplier = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT suppliers.*, users.username FROM suppliers LEFT OUTER JOIN users ON suppliers.user_id = users.id';
  const result = await db.query(query);
  return result;
};

module.exports = {
  getMaxCode,
  listSupplier
};
