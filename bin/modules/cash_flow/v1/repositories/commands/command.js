const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertCash = async (param) => {
  const { dateTime, type, cashIn, cashOut, description, createdAt, updatedAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const queryGetTotal = 'SELECT total FROM cash_flow ORDER BY id DESC LIMIT 1;';
  const resultGetTotal = await db.query(queryGetTotal);
  const p = JSON.stringify(resultGetTotal.data[0]);
  const x = Object.entries(JSON.parse(p))[0][1];
  const currentTotal = type === 1 ? Number(x) + Number(cashIn) : Number(x) - Number(cashOut);
  const query = `INSERT INTO cash_flow (id, date_time, type, cash_in, cash_out, total, description, created_at, updated_at)
  VALUES (NULL, '${dateTime}', '${type}', '${Number(cashIn)}', '${Number(cashOut)}', '${currentTotal}', '${description}', '${createdAt}', '${updatedAt}')`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  insertCash
};
