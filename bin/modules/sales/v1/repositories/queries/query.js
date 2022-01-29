const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listSale = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = 'SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant, products.id as productId FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id ORDER BY created_at DESC';
  const result = await db.query(query);
  return result;
};

const countSalesBySKU = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT COUNT(*) FROM sales LEFT JOIN users ON user_id = users.id LEFT JOIN products ON product_id = products.id LEFT JOIN merchants ON merchant_id = merchants.id WHERE sku = '${sku}' AND transaction_type = 'outcome' `;
  const result = await db.query(query);
  return result;
};

const findSalesByDate = async (date) => {
  const { startDate, endDate, transactionType, sku, skuInduk } = date;
  let tempQuery = '';
  if (sku && skuInduk) {
    tempQuery = ` products.sku = '${sku}' AND products.sku_induk = '${skuInduk}' AND`;
  } else if (sku) {
    tempQuery = ` products.sku = '${sku}' AND`;
  } else if (skuInduk) {
    tempQuery = ` products.sku_induk = '${skuInduk}' AND`;
  }
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, products.harga_modal as hargaProduct, products.size as productSize, products.sku_induk as productsSkuInduk ,merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE${tempQuery} sales.transaction_type ='${transactionType}' AND sales.created_at >= '${startDate}' AND sales.created_at <= '${endDate}'  + interval 1 DAY ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesBySKU = async (data) => {
  const { startDate, endDate, transactionType, sku } = data;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, products.harga_modal as hargaProduct, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.transaction_type='${transactionType}' AND sales.sku = '${sku}' AND sales.created_at = '${startDate}' AND sales.updated_at = '${endDate}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByUserId = async (params) => {
  const { startDate, endDate, transactionType, userId } = params;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, products.harga_modal as hargaProduct, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.transaction_type='${transactionType}' AND sales.user_id = '${userId}' AND sales.created_at = '${startDate}' AND sales.updated_at = '${endDate}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByProductId = async (params) => {
  const { startDate, endDate, transactionType, productId } = params;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, products.harga_modal as hargaProduct, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.transaction_type='${transactionType}' AND products.product_id = '${productId}' AND sales.created_at = '${startDate}' AND sales.updated_at = '${endDate}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findSalesByMerchantId = async (params) => {
  const { merchantId, transactionType, startDate, endDate } = params;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, products.harga_modal as hargaProduct, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.transaction_type='${transactionType}' AND sales.merchant_id = '${merchantId}' AND sales.created_at = '${startDate}' AND sales.updated_at = '${endDate}' ORDER BY sales.created_at DESC`;
  const result = await db.query(query);
  return result;
};

const findAllTransaction = async (params) => {
  const { transactionType, startDate, endDate } = params;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT sales.*, users.username as username, merchants.kode as kodeMerchant, merchants.nama as namaMerchant, merchants.email as emailMerhcant, merchants.kontak as kontakMerchant, products.id as productId FROM sales LEFT OUTER JOIN users ON sales.user_id = users.id LEFT OUTER JOIN products ON sales.product_id = products.id LEFT OUTER JOIN merchants ON sales.merchant_id = merchants.id WHERE sales.created_at >= '${startDate}' AND sales.created_at <= '${endDate}' AND sales.transaction_type ='${transactionType}'`;
  // console.log(db);
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
  findSalesByMerchantId,
  findAllTransaction
};
