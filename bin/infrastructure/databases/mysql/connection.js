const mysql = require('mysql');
const configs = require('../../configs/global_config');

const connectionPool = [];

const createConnectionPool = async (config) => {
  const currConnection = connectionPool.findIndex(conf => conf.config.toString() === config.toString());
  let db;
  if (currConnection === -1) {
    db = await mysql.createPool(config);
    connectionPool.push({
      config,
      connection: db
    });
  }
  return db;
};

const getConnection = async (config) => {
  const currConnection = connectionPool.filter(conf => conf.config.toString() === config.toString());
  let conn;
  currConnection.map((obj, i) => {
    if (i === 0) {
      const { connection } = obj;
      conn = connection;
    }
  });
  return conn;
};

const init = async () => {
  createConnectionPool(configs.get('/mysqlConfig'));
};

module.exports = {
  createConnectionPool,
  getConnection,
  init
};
