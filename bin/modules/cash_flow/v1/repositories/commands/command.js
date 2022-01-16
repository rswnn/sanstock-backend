const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertCash = async (param) => {
  const { dateTime, type, cashIn, cashOut, description, createdAt, updatedAt, userId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO cash_flow (id, date_time, type, cash_in, cash_out, description, created_at, updated_at, user_id)
  VALUES (NULL, '${dateTime}', '${type}', '${Number(cashIn)}', '${Number(cashOut)}', '${description}', '${createdAt}', '${updatedAt}', '${userId}') `;
  const result = await db.query(query);
  return result;
};

const insertCashFromAddSale = async (param) => {
  const { dateTime, type, cashIn, cashOut, description, createdAt, updatedAt, userId, salesId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO cash_flow (id, date_time, type, cash_in, cash_out, description, created_at, updated_at, user_id, sales_id)
  VALUES (NULL, '${dateTime}', '${type}', '${Number(cashIn)}', '${Number(cashOut)}', '${description}', '${createdAt}', '${updatedAt}', '${userId}',  '${salesId}')`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  insertCash,
  insertCashFromAddSale
};
