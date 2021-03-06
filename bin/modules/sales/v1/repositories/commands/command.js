const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertSale = async (param) => {
  const { sku, namaProduk, varian, invoiceMerchant, hargaJual, pajak, merchantFee, biayaLain, ongkir, kodeMrc, createdAt, updatedAt, userId, productId, merchantId, transcationType, qty } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `
    INSERT INTO sales(id, sku, nama_produk, varian, invoice_merchant, harga_jual, pajak, merchant_fee, biaya_lain, ongkir, created_at, updated_at, user_id, product_id, merchant_id, transaction_type, qty)
    VALUES (NULL, '${sku}', '${namaProduk}','${varian}','${invoiceMerchant}','${hargaJual}','${pajak}','${merchantFee}','${biayaLain}','${ongkir}','${createdAt}','${updatedAt}', '${userId}', '${productId}', '${merchantId}', '${transcationType}', '${qty}')
  `;
  const result = await db.query(query);
  return result;
};

const insertSaleAndUpdateProduct = async (param) => {
  const { sku, namaProduk, varian, hargaJual, createdAt, updatedAt, userId, productId, transcationType, qty } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `
    INSERT INTO sales(id, sku, nama_produk, varian, harga_jual, created_at, updated_at, user_id, product_id, transaction_type, qty)
    VALUES (NULL, '${sku}', '${namaProduk}','${varian}','${hargaJual}','${createdAt}','${updatedAt}', '${userId}', '${productId}', '${transcationType}', ${qty})
  `;
  const result = await db.query(query);
  return result;
};

const updateStockAfterSale = async (param) => {
  const { id, qty, transcationType } = param;
  const aritmath = transcationType === 'income' ? '-' : '+';
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE products set qty = qty ${aritmath} ${qty} WHERE id = ${id}`;
  const result = await db.query(query);
  return result;
};

const deleteSale = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM sales WHERE sales.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

const updateSale = async (param) => {
  const { sku, namaProduk, varian, invoiceMerchant, hargaJual, pajak, merchantFee, biayaLain, ongkir, kodeMrc, updatedAt, id, userId, productId, merchantId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE sales 
  SET sku = '${sku}', nama_produk = '${namaProduk}', varian = '${varian}', invoice_merchant = '${invoiceMerchant}', 
  harga_jual = '${hargaJual}',
  pajak = '${pajak}',
  merchant_fee = '${merchantFee}',
  biaya_lain = '${biayaLain}',
  ongkir = '${ongkir}',
  kode_mrc = '${kodeMrc}',
  updated_at = '${updatedAt}',
  user_id = '${userId}',
  product_id = '${productId}',
  merchant_id = '${merchantId}',
  WHERE sales.id = ${id}`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  insertSale,
  deleteSale,
  updateSale,
  updateStockAfterSale,
  insertSaleAndUpdateProduct
};
