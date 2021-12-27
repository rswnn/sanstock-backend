const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertSale = async (param) => {
  const { id, sku, namaProduk, varian, invoiceMerchant, hargaJual, pajak, merchantFee, biayaLain, ongkir, kodeMrc, createdAt, updatedAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `
    INSERT INTO sales(id, sku, nama_produk, varian, invoice_merchant, harga_jual, pajak, merchant_fee, biaya_lain, ongkir, kode_mrc, created_at, updated_at)
    VALUES ('${id}', '${sku}', '${namaProduk}','${varian}','${invoiceMerchant}','${hargaJual}','${pajak}','${merchantFee}','${biayaLain}','${ongkir}','${kodeMrc}','${createdAt}','${updatedAt}')
  `;
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
  const { id, sku, namaProduk, varian, invoiceMerchant, hargaJual, pajak, merchantFee, biayaLain, ongkir, kodeMrc, updatedAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE sales
  SET sku = '${sku}', nama_produk = '${namaProduk}', varian = '${varian}', invoice_merchant = '${invoiceMerchant}', 
  harga_jual = '${hargaJual}',
  pajak = '${pajak}',
  merchant_fee = '${merchantFee}',
  biaya_lain = '${biayaLain}',
  ongkir = '${ongkir}',
  kode_mrc = '${kodeMrc}',
  updated_at = '${updatedAt}'
  WHERE sales.id = ${id}`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  insertSale,
  deleteSale,
  updateSale
};
