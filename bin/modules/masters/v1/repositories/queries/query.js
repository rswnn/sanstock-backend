const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const getMaxCode = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT max(kode) as kodeTerbesar FROM merchants';
  const result = await db.query(query);
  return result;
};

const listMerchant = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT * FROM merchants';
  const result = await db.query(query);
  return result;
};

module.exports = {
  getMaxCode,
  listMerchant
};
