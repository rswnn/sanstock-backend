require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  postgresqlConfig: {
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    port: process.env.POSTGRESQL_PORT,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE
  }
};

const store = new confidence.Store(config);

exports.get = (key) => store.get(key);
