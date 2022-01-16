const restify = require('restify');
const project = require('../../package.json');
const wrapper = require('../helpers/utils/wrapper');
const basicAuth = require('../auth/basic_auth_helper');
const corsMiddleware = require('restify-cors-middleware');
const mysqlConnectionPooling = require('../infrastructure/databases/mysql/connection');
const userHandler = require('../modules/user/v1/handlers/api_handler');
const productHandler = require('../modules/products/v1/handlers/api_handler');
const merchantHandler = require('../modules/merchants/v1/handlers/api_handler');
const supplierHandler = require('../modules/suppliers/v1/handlers/api_handler');
const masterHandler = require('../modules/masters/v1/handlers/api_handler');
const saleHandler = require('../modules/sales/v1/handlers/api_handler');
const transactionHandler = require('../modules/transactions/v1/handlers/api_handler');
const generateReportHandler = require('../modules/reports/v1/handlers/api_handler');
const cashHandler = require('../modules/cash_flow/v1/handlers/api_handlers');
const jwtAuth = require('../auth/jwt_auth_helper');

function AppServer () {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }));
  this.server.use(restify.plugins.authorizationParser());
  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  /*
    ====================
        Add new route
    ====================
  */

  this.server.post('/users/v1/auth', basicAuth.isAuthenticated, userHandler.authenticate);
  this.server.post('/users/v1/add', userHandler.addUser);
  this.server.put('/users/v1/update', jwtAuth.verifyToken, userHandler.updateUser);
  this.server.get('/users/v1', basicAuth.isAuthenticated, userHandler.getListUser);

  this.server.post('/products/v1', jwtAuth.verifyToken, productHandler.addProduct);
  this.server.get('/products/v1', jwtAuth.verifyToken, productHandler.listProduct);
  this.server.del('/products/v1/:id', jwtAuth.verifyToken, productHandler.deleteProduct);
  this.server.put('/products/v1/:id', jwtAuth.verifyToken, productHandler.updateProduct);

  this.server.post('/merchants/v1', jwtAuth.verifyToken, merchantHandler.addMerchant);
  this.server.get('/merchants/v1', jwtAuth.verifyToken, merchantHandler.listMerchant);
  this.server.del('/merchants/v1/:id', jwtAuth.verifyToken, merchantHandler.deleteMerchant);
  this.server.put('/merchants/v1/:id', jwtAuth.verifyToken, merchantHandler.updateMerchant);

  this.server.post('/suppliers/v1', jwtAuth.verifyToken, supplierHandler.addSupplier);
  this.server.get('/suppliers/v1', jwtAuth.verifyToken, supplierHandler.listSupplier);
  this.server.del('/suppliers/v1/:id', jwtAuth.verifyToken, supplierHandler.deleteSupplier);
  this.server.put('/suppliers/v1/:id', jwtAuth.verifyToken, supplierHandler.updateSupplier);

  this.server.post('/cash/v1', jwtAuth.verifyToken, cashHandler.addCash);
  this.server.get('/cash/v1', jwtAuth.verifyToken, cashHandler.getBalance);

  this.server.get('/masters/v1', jwtAuth.verifyToken, masterHandler.listMaster);

  this.server.post('/sales/v1', jwtAuth.verifyToken, saleHandler.addSale);
  this.server.del('/sales/v1/:id', jwtAuth.verifyToken, saleHandler.deleteSale);
  this.server.put('/sales/v1/:id', jwtAuth.verifyToken, saleHandler.updateSale);

  this.server.get('/transactions/v1/histories', jwtAuth.verifyToken, transactionHandler.listHistory);

  this.server.get('/generateReport', jwtAuth.verifyToken, generateReportHandler.generateReport);

  mysqlConnectionPooling.init();
  // postgresqlConnectionPooling.init();
}

module.exports = AppServer;
