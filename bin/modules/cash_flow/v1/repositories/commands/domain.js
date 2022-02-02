const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class CashFlow {
  async addCash (payload) {
    payload.dateTime = moment(payload.dateTime).format('YYYY-MM-DD HH:mm:ss');
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertCashData = await command.insertCash(payload);
    if (insertCashData.err) {
      return wrapper.error('err', insertCashData.message, insertCashData.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }
}

module.exports = CashFlow;
