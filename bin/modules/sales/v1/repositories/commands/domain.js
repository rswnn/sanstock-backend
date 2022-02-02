const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const commandCashFLow = require('../../../../cash_flow/v1/repositories/commands/command');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class Sale {
  async addSale (payload) {
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    payload.transcationType = 'income';
    const insertSale = await command.insertSale(payload);
    if (insertSale.err) {
      return wrapper.error('err', insertSale.message, insertSale.code);
    }

    const insertId = { ...insertSale.data };
    payload.salesId = insertId.insertId;
    payload.dateTime = payload.createdAt;
    payload.type = '1';
    payload.cashIn = payload.hargaJual;
    payload.cashOut = 0;
    payload.description = 'Tambah Income';
    const insertCashFlow = await commandCashFLow.insertCashFromAddSale(payload);
    const updateStockAfterSale = await command.updateStockAfterSale({ ...payload, id: payload.productId });
    if (insertCashFlow.err || updateStockAfterSale.err) {
      return wrapper.error('err', insertCashFlow.message, insertCashFlow.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }

  async deleteSale (payload) {
    const deleteSale = await command.deleteSale(payload);
    if (deleteSale.err) {
      return wrapper.error('err', deleteSale.message, deleteSale.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateSale (payload) {
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateSale = await command.updateSale(payload);
    if (updateSale.err) {
      return wrapper.error('err', updateSale.message, updateSale.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }

  async addStock (payload) {
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    payload.transcationType = 'outcome';
    payload.hargaJual = payload.hargaModal * payload.qty;
    const insertSale = await command.insertSaleAndUpdateProduct(payload);

    const insertId = { ...insertSale.data };
    payload.salesId = insertId.insertId;
    payload.dateTime = payload.createdAt;
    payload.type = '2';
    payload.cashIn = 0;
    payload.cashOut = payload.hargaJual;
    payload.description = 'Tambah Stock';
    const insertCashFlow = await commandCashFLow.insertCashFromAddSale(payload);
    const updateStockAfterSale = await command.updateStockAfterSale({ ...payload, id: payload.productId });

    if (insertSale.err || updateStockAfterSale.err || insertCashFlow.err) {
      return wrapper.error('err', insertSale.message, insertSale.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }
}

module.exports = Sale;
