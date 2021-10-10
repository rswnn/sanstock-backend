const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertSupplier = async (param) => {
  const { kode, nama, email, kontak, detail, createdAt, updatedAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO suppliers (id, kode, nama, email, kontak, detail, created_at, updated_at) 
  VALUES (NULL, '${kode}', '${nama}', '${email}', '${kontak}', '${detail}', '${createdAt}', '${updatedAt}')`;
  const result = await db.query(query);
  return result;
};

const deleteSupplier = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM suppliers WHERE suppliers.id = ${id}`;
  const result = await db.query(query);
  return result;
};

const updateSupplier = async (param) => {
  const { id, nama, email, kontak, detail, updatedAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE suppliers 
  SET nama = '${nama}', email = '${email}', kontak = '${kontak}', detail = '${detail}', updated_at = '${updatedAt}'
  WHERE suppliers.id = ${id}`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  insertSupplier,
  deleteSupplier,
  updateSupplier
};
