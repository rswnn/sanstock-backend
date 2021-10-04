const Mysql = require('../../../../../infrastructure/databases/mysql/db');

const insertUser = async (param) => {
    const db = new Mysql(config.get('/mysqlConfig'));
    const query = ``
    const result = await db.query(query, [param]);
    return result;
  };

module.exports = {
    insertUser
};