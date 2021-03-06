const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listProduct = async (params) => {
  const startDate = params ? params.startDate : null;
  const endDate = params ? params.endDate : null;
  let withDate = '';

  if (startDate && endDate) {
    withDate = `WHERE products.created_at >= '${startDate}' AND products.created_at <= '${endDate}'  + interval 1 DAY ORDER BY products.created_at ASC`;
  }
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id ${withDate}`;
  const result = await db.query(query);
  return result;
};

const findProductByDate = async (date) => {
  const { startDate, endDate, sku, skuInduk } = date;
  let tempQuery = '';
  if (sku && skuInduk) {
    tempQuery = ` products.sku = '${sku}' AND products.sku_induk = '${skuInduk}' AND`;
  } else if (sku) {
    tempQuery = ` products.sku = '${sku}' AND`;
  } else if (skuInduk) {
    tempQuery = ` products.sku_induk = '${skuInduk}' AND`;
  }

  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id WHERE${tempQuery} products.created_at >= '${startDate}' AND products.created_at <= '${endDate}'  + interval 1 DAY ORDER BY products.created_at ASC`;
  const result = await db.query(query);
  return result;
};

const findProductBySKU = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id WHERE sku = '${sku}' ORDER BY products.created_at ASC `;
  const result = await db.query(query);
  return result;
};

const findProductBySKUInduk = async (sku) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id WHERE sku_induk = '${sku}' ORDER BY products.created_at ASC`;
  const result = await db.query(query);
  return result;
};

const findProductByUserId = async (userId) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.user_id = '${userId}' ORDER BY products.created_at ASC`;
  const result = await db.query(query);
  return result;
};

const findProductBySupplierId = async (supplierId) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT products.*, suppliers.kode as kodeSup, suppliers.kontak as kontakSupplier, suppliers.nama as supplierName, users.username as username FROM products LEFT OUTER JOIN users ON products.user_id = users.id LEFT OUTER JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.supplier_id = '${supplierId}' ORDER BY products.created_at DESC`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listProduct,
  findProductByDate,
  findProductBySKU,
  findProductBySKUInduk,
  findProductByUserId,
  findProductBySupplierId
};
