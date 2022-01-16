const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listSale = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant, products.id as productId FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id';
  const result = await db.query(query);
  return result;
};

const countSalesBySKU = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT COUNT(*) FROM sales LEFT JOIN users ON user_id = users.id LEFT JOIN products ON product_id = products.id LEFT JOIN merchants ON merchant_id = merchants.id WHERE sku = '${sku}'`;
  const result = await db.query(query);
  return result;
};

const findSalesByDate = async (date) => {
  const { startDate, endDate } = date;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.created_at >= '${startDate}' AND sales.created_at <= '${endDate}'  + interval 1 DAY ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesBySKU = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE products.sku = '${sku}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByUserId = async (userId) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE products.user_id = '${userId}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByProductId = async (productId) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE product_id = '${productId}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByMerchantId = async (merchantId) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE merchant_id = '${merchantId}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listSale,
  countSalesBySKU,
  findSalesByDate,
  findSalesBySKU,
  findSalesByProductId,
  findSalesByUserId,
  findSalesByMerchantId
};
