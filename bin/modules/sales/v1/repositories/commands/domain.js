const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const commandCashFLow = require('../../../../cash_flow/v1/repositories/commands/command');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class Sale {
  async addSale (payload) {
    payload.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertSale = await command.insertSale(payload);
    if (insertSale.err) {
      return wrapper.error('err', insertSale.message, insertSale.code);
    }
    payload.dateTime = payload.createdAt;
    payload.type = 1;
    payload.cashIn = payload.hargaJual;
    payload.cashOut = 0;
    payload.total = 1000;
    payload.description = "Tambah Income";
    const insertCashFlow = await commandCashFLow.insertCashFromAddSale(payload)
    if (insertCashFlow.err) {
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
}

module.exports = Sale;
