const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertMerchant = async (param) => {
  const { kode, nama, email, kontak, detail, createdAt, updatedAt, userId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO merchants (id, kode, nama, email, kontak, detail, created_at, updated_at, user_id) 
  VALUES (NULL, '${kode}', '${nama}', '${email}', '${kontak}', '${detail}', '${createdAt}', '${updatedAt}', '${userId}')`;
  const result = await db.query(query);
  return result;
};

const deleteMerchant = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM merchants WHERE merchants.id = ${id}`;
  const result = await db.query(query);
  return result;
};

const updateMerchant = async (param) => {
  const { id, nama, email, kontak, detail, updatedAt, userId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE merchants 
  SET nama = '${nama}', email = '${email}', kontak = '${kontak}', detail = '${detail}', updated_at = '${updatedAt}', user_id = '${userId}'
  WHERE merchants.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertMerchant,
  deleteMerchant,
  updateMerchant
};
