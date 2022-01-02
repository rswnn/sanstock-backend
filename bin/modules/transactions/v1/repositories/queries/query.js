const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listProduct = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT products.*, users.username as username, sales.id as salesId FROM sales LEFT OUTER JOIN products ON products.product_id = products.id';
  const result = await db.query(query);
  return result;
};

module.exports = {
  listProduct
};
