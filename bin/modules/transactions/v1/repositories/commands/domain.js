const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class Sale {
  async addSale (payload) {
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertSale = await command.insertSale(payload);
    if (insertSale.err) {
      return wrapper.error('err', insertSale.message, insertSale.code);
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
    payload.updatedAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    const updateSale = await command.updateSale(payload);
    if (updateSale.err) {
      return wrapper.error('err', updateSale.message, updateSale.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Sale;
