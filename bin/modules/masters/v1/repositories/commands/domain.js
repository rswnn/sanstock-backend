const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const helpers = require('../../utils/helpers');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class Merchant {
  async addMerchant (payload) {
    const autoCodeGeneration = await helpers.autoCodeGeneration();
    if (autoCodeGeneration.err) {
      return wrapper.error('err', autoCodeGeneration.message, autoCodeGeneration.code);
    }
    payload.kode = autoCodeGeneration.data;
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertMerchant = await command.insertMerchant(payload);
    if (insertMerchant.err) {
      return wrapper.error('err', insertMerchant.message, insertMerchant.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }

  async deleteMerchant (payload) {
    const deleteMerchant = await command.deleteMerchant(payload);
    if (deleteMerchant.err) {
      return wrapper.error('err', deleteMerchant.message, deleteMerchant.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateMerchant (payload) {
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateMerchant = await command.updateMerchant(payload);
    if (updateMerchant.err) {
      return wrapper.error('err', updateMerchant.message, updateMerchant.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Merchant;
