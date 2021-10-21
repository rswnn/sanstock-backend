const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listProduct = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT * FROM products';
  const result = await db.query(query);
  return result;
};

const findProductByDate = async (date) => {
  const { startDate, endDate } = date;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM products WHERE created_at >= '${startDate}' OR created_at <= '${endDate}' ORDER BY created_at DESC`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listProduct,
  findProductByDate
};
