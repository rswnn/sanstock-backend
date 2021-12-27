const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listSale = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT * FROM sales LEFT JOIN users ON user_id = users.id LEFT JOIN products ON product_id = products.id LEFT JOIN merchants ON merchant_id = merchants.id';
  const result = await db.query(query);
  return result;
};

const countSalesBySKU = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT COUNT(*) FROM sales LEFT JOIN users ON user_id = users.id LEFT JOIN products ON product_id = products.id LEFT JOIN merchants ON merchant_id = merchants.id WHERE sku = '${sku}'`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listSale,
  countSalesBySKU
};
