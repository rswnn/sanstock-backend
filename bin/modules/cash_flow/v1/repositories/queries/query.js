const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const getBalance = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const queryCashIn = 'SELECT SUM(cash_in) AS "allCashIn" FROM cash_flow';
  const resultCashIn = await db.query(queryCashIn);
  const queryCashOut = 'SELECT SUM(cash_out) AS "allCashOut" FROM cash_flow';
  const resultCashOut = await db.query(queryCashOut);
  const currentCashIn = 'SELECT SUM(cash_in) AS "currentCashIn" FROM cash_flow WHERE DATE(`date_time`) = CURDATE()';
  const currentCashOut = 'SELECT SUM(cash_out) AS "currentCashOut" FROM cash_flow WHERE DATE(`date_time`) = CURDATE()';
  const resultCurrentCashIn = await db.query(currentCashIn);
  const resultCurrentCashOut = await db.query(currentCashOut);

  const result = {
    resultCashIn,
    resultCashOut,
    resultCurrentCashIn,
    resultCurrentCashOut
  };

  return result;
};

module.exports = {
  getBalance
};
