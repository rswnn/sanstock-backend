const Mysql = require('../../../../../infrastructure/databases/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertUser = async (param) => {
    const db = new Mysql(configs.get('/mysqlConfig'));
    const query = ``
    const result = await db.query(query, [param]);
    return result;
  };

module.exports = {
    insertUser
};